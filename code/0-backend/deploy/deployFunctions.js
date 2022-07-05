"use strict";

const yargs = require("yargs");

const nodePath = require("path");

const isProductionMode = yargs.argv.mode === "production";

const c = "c";

const type = yargs.argv.type || yargs.argv.t || "uc";

if (isProductionMode) {
  console.log("☢︎🐑 is production mode");

  require("dotenv").config({
    path: `${__dirname}/.env`,
  });

  process.env.NFTMINE_ENV = "production";
} else {
  console.log("🐲🐉 is staging mode");

  require("dotenv").config({
    path: `${__dirname}/.staging.env`,
  });

  process.env.NFTMINE_ENV = "staging";
}

const stringify = (message) => JSON.stringify(message, null, 4);

const environmentVariables = Object.assign({}, process.env);

const {
  // AWS
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_ACCOUNT_NUMBER,
  API_PREFIX,
} = environmentVariables;

const getFunctionDataFunctions = require("./007getFunctionDataFunctions");

const rawFunctionData = [];

Object.keys(getFunctionDataFunctions).forEach((getFunctionDataFunctionKey) => {
  const getFunctionDataFunction =
    getFunctionDataFunctions[getFunctionDataFunctionKey];

  const rawFunctionDataPortion = getFunctionDataFunction({
    isProductionMode,
    environmentVariables,
  });

  rawFunctionData.push(...rawFunctionDataPortion);
});

const functionData = [];

for (const rawFunctionDatum of rawFunctionData) {
  if (process.env.NFTMINE_ENV !== "production") {
    const functionDatum = Object.assign({}, rawFunctionDatum, {
      name: `${API_PREFIX}${rawFunctionDatum.name}_staging`,
      role:
        "arn:aws:iam::" +
        `${AWS_ACCOUNT_NUMBER}:role/` +
        `${API_PREFIX}lambda_${rawFunctionDatum.name}_staging`,
    });

    functionData.push(functionDatum);
  } else {
    const functionDatum = Object.assign({}, rawFunctionDatum, {
      name: `${API_PREFIX}${rawFunctionDatum.name}`,
      role:
        "arn:aws:iam::" +
        `${AWS_ACCOUNT_NUMBER}:role/` +
        `${API_PREFIX}lambda_${rawFunctionDatum.name}`,
    });

    functionData.push(functionDatum);
  }
}

const commonPathsToInclude = [];

const commonEnvironmentVariables = {
  IS_LAMBDA: "true",
};

const execa = require("execa");
const bluebird = require("bluebird");
const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const cache = Object.seal({
  emptyFunctionCode: null,
});

const lambda = new AWS.Lambda();

// const ROOT_PATH = `${__dirname}/`;

/*
    Deploy Lambda Script:
        remove node modules
        install production node modules
        for each lambda function data
            -zip folders
            -update code
*/

const remove = ({ cwd, pathToRemove }) => {
  if (type === c) {
    return Promise.resolve();
  }

  console.log("running remove ", stringify({ pathToRemove, cwd }));

  const command = "rm";

  const args = ["-rf", pathToRemove];

  const options = {
    cwd,
  };

  return execa(command, args, options).then(() => {
    console.log("remove executed successfully");
  });
};

const installNodeModules = ({ production = false, cwd }) => {
  if (type === c) {
    return;
  }

  console.log("running installNodeModules, production:", production);
  console.log("installNodeModules, cwd:", cwd);

  const command = "npm";

  const args = ["install"];

  if (production) {
    args.push("--only=prod");
  }

  const options = {
    cwd,
  };

  return execa(command, args, options).then(() => {
    console.log(
      "installNodeModules executed successfully",
      "production:",
      production
    );
  });
};

const getOrCreateFunction = async ({ functionNickname, functionName }) => {
  console.log(`running getOrCreateFunction for: ${functionNickname}`);

  const params = {
    FunctionName: functionName,
  };

  try {
    await new Promise((resolve, reject) => {
      lambda.getFunction(
        params,

        (err, data) => {
          if (!!err || !data) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    console.log(
      "getOrCreateFunction: " +
        `${functionName}(${functionNickname}) ` +
        "already exists"
    );
  } catch (err) {
    if (err.statusCode === 404) {
      console.log(
        `getOrCreateFunction: ${functionName} does not exist, ` +
          "creating function"
      );

      if (!cache.emptyFunctionCode) {
        cache.emptyFunctionCode = await new Promise((resolve, reject) => {
          fs.readFile(`${__dirname}/emptyLambda.js.zip`, (err, zipFile) => {
            if (err) {
              return reject(err);
            }

            resolve(zipFile);
          });
        });
      }

      await new Promise((resolve, reject) => {
        lambda.createFunction(
          {
            Code: {
              ZipFile: cache.emptyFunctionCode,
            },
            FunctionName: functionName,
            Handler: "index.handler",
            MemorySize: 128,
            Publish: true,
            Role: `arn:aws:iam::${AWS_ACCOUNT_NUMBER}:role/bitcoin_api_lambda_infrastructure_emptyLambda`,
            Runtime: "nodejs12.x",
            Timeout: 30,
            VpcConfig: {},
          },

          (err, data) => {
            if (!!err || !data) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    } else {
      throw err;
    }
  }

  console.log(
    `getOrCreateFunction: executed successfully for ${functionName}` +
      `(${functionNickname})`
  );
};

const zipFunctionCode = async ({
  zipFileName,
  functionSpecificPathsToInclude,
  path,
  folderName,
  includeRealpoiMapData,
}) => {
  console.log(`
  
      MEGA LOG: ${JSON.stringify(
        {
          zipFileName,
          functionSpecificPathsToInclude,
          path,
          folderName,
          includeRealpoiMapData,
        },
        null,
        4
      )}
  
  `);

  console.log("running zipFunctionCode");

  const zipFilePath = `${__dirname}/dist/${zipFileName}.zip`;

  const command = "zip";

  const pathsToIncludeSet = new Set(commonPathsToInclude);

  pathsToIncludeSet.add(path);

  for (const p of functionSpecificPathsToInclude) {
    pathsToIncludeSet.add(p);
  }

  const pathsToInclude = Array.from(pathsToIncludeSet);

  console.log("zipFileName:", zipFileName);
  console.log("paths to include:", JSON.stringify(pathsToInclude));

  // const args = [zipFilePath, "-r"].concat(pathsToInclude);

  const tempPath = `${__dirname}/lambdaFiles/${folderName}`;

  // await execa("mkdir", tempPath, {
  //   cwd: __dirname,
  // });
  await execa("cp", ["-r", path, tempPath], {
    cwd: __dirname,
  });

  await execa("cp", ["-r", nodePath.join(__dirname, "..", "utils")], {
    cwd: __dirname,
  });

  await installNodeModules({
    cwd: `${__dirname}/lambdaFiles/utils`,
    production: true,
  });

  await new Promise((resolve, reject) => {
    const pjPath = `${__dirname}/lambdaFiles/${folderName}/package.json`;

    fs.readFile(pjPath, async (err, pjString) => {
      if (err) {
        return reject(err);
      }

      const pj = JSON.parse(pjString);

      pj.dependencies["compute-utils"] = "file:../utils";

      if (includeRealpoiMapData) {
        console.log(`
        
        
            MEGA LOG: ${JSON.stringify(
              {
                HERE: "NAOW",
              },
              null,
              4
            )}
        
        
        `);

        pj.dependencies["uutils-realpoimap"] = "file:../uUtils/realpoiMap";

        await execa("mkdir", [`${__dirname}/lambdaFiles/uUtils`], {
          cwd: __dirname,
        });

        await execa("mkdir", [`${__dirname}/lambdaFiles/uUtils/realpoiMap`], {
          cwd: __dirname,
        });

        await execa(
          "cp",
          [
            "-r",
            nodePath.join(__dirname, "..", "uUtils/realpoiMap"),
            `${__dirname}/lambdaFiles/uUtils`,
          ],
          {
            cwd: __dirname,
          }
        );
      }

      const newPjString = JSON.stringify(pj, null, 2);

      fs.writeFile(pjPath, newPjString, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  });

  await installNodeModules({
    cwd: `${__dirname}/lambdaFiles/${folderName}`,
    production: true,
  });

  const args = [zipFilePath, "-r", `./lambdaFiles`];

  const options = {
    cwd: __dirname,
  };

  return await execa(command, args, options)
    .then(() => {
      return new Promise((resolve, reject) => {
        fs.readFile(zipFilePath, (err, zipFile) => {
          if (err) {
            return reject(err);
          }

          resolve(zipFile);
        });
      });
    })
    .then((zipFile) => {
      console.log("zipFunctionCode executed successfully for", zipFileName);

      const results = {
        zipFile,
      };

      return results;
    });
};

const uploadFunction = async ({ nickname, name, zipFile }) => {
  console.log(`running uploadFunction for: ${nickname}`, name);

  const params = {
    FunctionName: name,
    ZipFile: zipFile,
  };

  await new Promise((resolve, reject) => {
    lambda.updateFunctionCode(params, (err /*, data*/) => {
      if (err) {
        return reject(err);
      }

      console.log("uploadFunction executed successfully for", nickname);

      setTimeout(() => {
        resolve();
      }, 2000);
    });
  });
};

const updateFunctionConfiguration = ({
  nickname,
  name,
  handler,
  // role,
  environmentVariables = {},
  timeout = 30,
  memory = 128,
  roleArn,
}) => {
  console.log(`running updateFunctionConfiguration for: ${nickname}`);

  const params = {
    FunctionName: name,
    Handler: handler,
    Role: roleArn,
    Environment: {
      Variables: Object.assign(
        {},
        commonEnvironmentVariables,
        environmentVariables
      ),
    },
    Runtime: "nodejs14.x",
    Timeout: timeout,
    MemorySize: memory,
  };

  return new Promise((resolve, reject) => {
    lambda.updateFunctionConfiguration(params, (err /*, data*/) => {
      if (err) {
        return reject(err);
      }

      console.log(
        "updateFunctionConfiguration executed successfully for",
        nickname
      );

      resolve();
    });
  });
};

const deployFunction = async ({
  nickname,
  name,
  path,
  handler,
  role,
  pathsToInclude,
  environmentVariables,
  timeout,
  memory,
  folderName,
  roleArn,
  includeRealpoiMapData,
}) => {
  await getOrCreateFunction({
    functionNickname: nickname,
    functionName: name,
  });

  if (type.includes("update") || type.includes("u")) {
    await remove({
      cwd: path,
      pathToRemove: `./node_modules`,
    });

    await remove({
      cwd: nodePath.join(__dirname, "..", "utils"),
      pathToRemove: `./node_modules`,
    });

    // await installNodeModules({
    //   cwd: path,
    //   production: true,
    // });

    const { zipFile } = await zipFunctionCode({
      zipFileName: name,
      path,
      functionSpecificPathsToInclude: pathsToInclude,
      folderName,
      includeRealpoiMapData,
    });

    await uploadFunction({ nickname, name, zipFile });
  }

  if (type.includes("config") || type.includes("c")) {
    await updateFunctionConfiguration({
      nickname,
      name,
      handler,
      role,
      environmentVariables,
      timeout,
      memory,
      roleArn,
    });
  }
};

const getSelectedFunctionData = Object.freeze(() => {
  if (yargs.argv.functions) {
    const selectedFunctions = yargs.argv.functions.split(",");

    const selectedFunctionData = functionData.filter(({ nickname }) =>
      selectedFunctions.includes(nickname)
    );

    return selectedFunctionData;
  }

  return functionData;
});

const deployFunctions = Object.freeze(async () => {
  console.log("running deployFunctions");

  // return removeNodeModulesAndOldDist()
  // .then(() => {
  // return installNodeModules({ production: true });
  // })
  // .then(() => {
  const selectedFunctionData = getSelectedFunctionData();

  await execa("rm", ["-rf", "./dist"], { cwd: __dirname });
  await execa("rm", ["-rf", "./lambdaFiles"], { cwd: __dirname });

  await execa("mkdir", ["./dist"], { cwd: __dirname });

  return bluebird.map(
    selectedFunctionData,
    async ({
      nickname,
      path,
      name,
      handler,
      role,
      pathsToInclude,
      environmentVariables,
      timeout,
      folderName,
      roleArn,
      memory,
      includeRealpoiMapData,
    }) => {
      await execa("mkdir", ["./lambdaFiles"], { cwd: __dirname });

      await deployFunction({
        nickname,
        name,
        handler,
        role,
        path,
        pathsToInclude,
        environmentVariables,
        timeout,
        memory,
        folderName,
        roleArn,
        includeRealpoiMapData,
      });

      await execa("rm", ["-rf", "./lambdaFiles"], { cwd: __dirname });
    },
    { concurrency: 1 }
  );
  // .then(() => {
  //   return installNodeModules();
  // })
  // .then(() => {
  //   console.log("deployFunctions successfully executed");
  // })
  // .catch((err) => {
  //   console.log("an error occurred in deployFunctions:", err);
  // });
});

deployFunctions();
