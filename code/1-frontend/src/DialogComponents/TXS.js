import TxDisplaySection from "../ExpansiveComponents/TxDisplaySection";

const TXS = ({
  isLoading,
  setIsLoading,
  setUserData,
  address,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  pag,
  setPag,
}) => {
  return (
    <div
      style={{
        height: 500,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(7, 11, 34)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 20,
          width: "80%",
        }}
      >
        <TxDisplaySection
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setUserData={setUserData}
          address={address}
          transactionIdToTransaction={transactionIdToTransaction}
          setTransactionIdToTransaction={setTransactionIdToTransaction}
          pag={pag}
          setPag={setPag}
        />
      </div>
    </div>
  );
};

export default TXS;
