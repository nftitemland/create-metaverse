"use strict";

const stringify = require("./stringify");

const aws = require("./aws");

const snsTopicArn = process.env.SNS_OPERATOR_NOTIFICATIONS_ARN;

if (!snsTopicArn) {
  throw new Error(
    "utils.sendSNS operation error: missing SNS_OPERATOR_NOTIFICATIONS_ARN env"
  );
}

const sendSNS = async ({ subject, message }) => {
  console.log(
    "👑🐸▶️Running sendSNS with the following values: " +
      stringify({
        subject,
        message,
      })
  );

  //   if (!subjects.subject) {
  //     throw new Error(`sendSNS error: invalid subject ${subject}`);
  //   }

  await new Promise((resolve, reject) =>
    aws.sns.publish(
      {
        Message: message,
        Subject: subject,
        TopicArn: snsTopicArn,
      },
      (err, data) => {
        if (err) {
          console.log("sendSNS error: " + "error in SNS publish message:", err);

          return reject(err);
        }

        resolve(data);
      }
    )
  );

  console.log("👑🐸✅ sendSNS executed successfully");
};

// sendEventToSee.subjects = subjects;

module.exports = Object.freeze(sendSNS);
