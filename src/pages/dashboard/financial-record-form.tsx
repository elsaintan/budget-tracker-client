import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [date, setPaymentDate] = useState<string>("");
  const { addRecord } = useFinancialRecords();

  const { user } = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      type: type,
      userId: user?.id ?? "",
      date: new Date(date),
      description: description,
      amount: parseFloat(amount),
      category: category,
      paymentMethod: paymentMethod,
    };

    addRecord(newRecord);
    setType("");
    setPaymentDate("");
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="form-field">
          <label>Type:</label>
          <select required className="input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select a Type</option>
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
        </div>
        <div className="form-field">
          <label>Date:</label>
          <input type="datetime-local" required className="input" value={date} onChange={(e) => setPaymentDate(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Description:</label>
          <input type="text" required className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Amount:</label>
          <input type="number" required className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Category:</label>
          <select required className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a Category</option>
            <optgroup label="Food">
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Beverages">Beverages</option>
              <option value="Eating Out">Eating Out</option>
            </optgroup>
            <optgroup label="Social Life">
              <option value="Friend">Friend</option>
              <option value="Fellowship">Fellowship</option>
              <option value="Alumni">Alumni</option>
              <option value="Dues">Dues</option>
            </optgroup>
            <optgroup label="Household">
              <option value="Appliances">Appliances</option>
              <option value="Furniture">Furniture</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Toiletries">Toiletries</option>
              <option value="Chandlery">Chandlery</option>
            </optgroup>
            <optgroup label="Apparel">
              <option value="Clothing">Clothing</option>
              <option value="Fashion">Fashion</option>
              <option value="Shoes">Shoes</option>
              <option value="Laundry">Laundry</option>
            </optgroup>
            <optgroup label="Income">
              <option value="Allowance">Allowance</option>
              <option value="Salary">Salary</option>
              <option value="Petty Cash">Petty Cash</option>
              <option value="Bonus">Bonus</option>
            </optgroup>
            <option value="Gift">Gift</option>
            <option value="Education">Education</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-field">
          <label>Payment Method:</label>
          <select required className="input" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};
