import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      if (record.type == 'Expenses') {
        totalAmount += record.amount;
      }
    });

    const currency = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0
    });
    return currency.format(totalAmount);
  }, [records]);

  const totalIncome = useMemo(() => {
    let totalIncome = 0;
    records.forEach((record) => {
      if (record.type == 'Income') {
        totalIncome += record.amount;
      }
    });

    const currency = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0
    });
    return currency.format(totalIncome);
  }, [records]);

  const total = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    records.forEach((record) => {
      if (record.type == 'Income') {
        totalIncome += record.amount;
      }else if(record.type == 'Expenses'){
        totalExpenses += record.amount;
      }
    });

    let total = totalIncome - totalExpenses;
    const currency = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0
    });
    return currency.format(total);
  }, [records]);

  return (
    <div className="dashboard-container">
      <h1> Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <FinancialRecordForm />
      <div>Total Income {totalIncome}</div>
      <div>Total Expenses {totalMonthly}</div>
      <div>Total {total}</div>
      <FinancialRecordList />
    </div>
  );
};
