import { jwtDecode } from 'jwt-decode';
import { Plus, X, Pencil, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Customer() {
  const [isAdmin, setAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [editcustomer, setEditCustomer] = useState(false);
  const [editcustomerId, setEditCustomerId] = useState(null);
  const [customerform, setCustomerForm] = useState({
    name: "",
    contact_info: "",
    status: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCustomerForm({ ...customerform, [e.target.name]: e.target.value });
  }
  const handleCustomerDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${baseUrl}/api/customer/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
          }
      });
      alert(res.data.message);
      fetchCustomer();
    }
    catch(err){
      console.error(err);alert(err.response?.data?.message || "Something went wrong");
    }
  }

  }
  const handleCustomerEdit = (data) => {
    setCustomerForm({
      name:data.name,
      contact_info:data.contact_info,
      status:data.status
    });
    setEditCustomerId(data._id);
    setEditCustomer(true);
    setShowModal(true);
  }
  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let res;
      if(editcustomer && editcustomerId){//Edit new Customer
        res = await axios.put(`${baseUrl}/api/customer/${editcustomerId}`,customerform,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
      }
      else{ //Add new Customer
      res = await axios.post(`${baseUrl}/api/customer/`, customerform, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
      console.log(res.data);
      console.log(res.data.message);
      alert(res.data.message);
      setCustomerForm({
        name: '', contact_info: '', status: ''
      });
      setShowModal(false);
      setEditCustomer(false);
      setEditCustomerId(null);
      fetchCustomer();
      // navigate('/customer')
      // setCustomerForm({...customerform})
    }
    catch (err) {
      console.error(err);
    alert(err.response?.data?.message || 'Something went wrong');
    }
  }
  const fetchCustomer = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseUrl}/api/customer`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCustomer(res.data.customers || []);
      console.log(res.data.customers);

    }
    catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchCustomer();
  }, []);
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      console.log(decode);
      setAdmin(decode.role === 'admin');

    }
    catch (err) {
      console.error("No User", err);
    }

  }, []);
  return (
    <>
      <div className="max-w-6xl w-full mx-auto p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">Customer List</h2>

          {/* Add Button */}

          {isAdmin && (
            <button onClick={() => {
            setEditCustomer(false);
            setEditCustomerId(null);
            setCustomerForm({name:"",contact_info:"",status:""
            });
            setShowModal(true)
            }
            } className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 transition">
              <Plus size={18} /> Add
            </button>
          )}
        </div>

        {/* Customer Table / Cards will go here later */}
        {customer.length === 0 ? (
          <div className="border rounded p-4 text-gray-600">
            No customers available.
          </div>)
          : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {
                customer.map((data, index) => (
                  <div key={data._id || index} className="relative p-4 bg-white shadow-lg rounded-lg border border-slate-100 col-span-1">
                    {/* <h1 className="font-semibold text-lg">{data.name}</h1> */}
                    <div className="space-y-2">
                      <p className="flex gap-4 mb-2">
                        <span className="w-32 font-medium">Customer Name</span><span className="w-2">:</span>
                        <span className="text-gray-800">{data.name}</span>
                      </p>
                      <p className="flex gap-4 mb-2">
                        <span className="w-32 font-medium">Contact Info</span><span className="w-2">:</span>
                        <span className="text-gray-800">{data.contact_info}</span>
                      </p>
                      <p className="flex gap-4 mb-2 capitalize">
                        <span className="w-32 font-medium">Status</span><span className="w-2">:</span>
                        <span className={
                          data.status === "active" ? "text-green-600" : "text-red-600"}>{data.status}</span>
                      </p>
                    </div>
                    <div className="absolute right-4 bottom-4 flex gap-4 flex-row">
                      {isAdmin && (
                        <>
                        <button onClick={() => handleCustomerEdit(data)} className="mt-3 flex flex-col items-center gap-2 px-3 py-2 text-sm bg-slate-600 text-white rounded hover:bg-slate-700">
                          <Pencil size={14} />
                        </button>

                         <button onClick={() => handleCustomerDelete(data._id)} className="mt-3 flex flex-col items-center gap-2 px-3 py-2 text-sm bg-slate-600 text-white rounded hover:bg-slate-700">
                          <Trash size={14} />
                        </button>
                        </>
                      )}
                  </div>
                  </div>
                ))
              }
            </div>

          )
        }
        {showModal && (
          <div className="fixed inset-0 bg-black-10 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 py-2 relative">
              <div className="px-6">
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-2 text-gray-500 hover:text-gray-800"
                >
                  <X size={20} />
                </button>

                <h3 className="text-lg font-semibold mb-1">{editcustomer ? 'Edit Customer' : 'Add Customer' }</h3></div>
              <form className="space-y-4 w-full" onSubmit={handleCustomerSubmit}>
                <div className="border-y px-6 py-3 border-slate-200 w-full">
                  <label htmlFor="name" className="block my-1 text-sm font-medium text-left text-black">Customer Name</label>
                  <input type="text" onChange={handleChange} name="name" value={customerform.name} placeholder="Enter a Customer Name"
                    className="w-full px-4 py-2 border rounded" />
                  <label htmlFor="contact_info" className="block my-1 text-sm font-medium text-left text-black">Contact Information</label>
                  <input type="text" onChange={handleChange} name="contact_info" value={customerform.contact_info} placeholder="Enter a Contact Information"
                    className="w-full px-4 py-2 border rounded" />

                  <label htmlFor="status" className="block my-1 text-sm font-medium text-left text-black">Status</label>
                  <select onChange={handleChange} name="status" value={customerform.status} className="w-full px-4 py-2 border rounded">
                    <option value="" >---Select a Status---</option>
                    <option value="active" >Active</option>
                    <option value="inactive" >Inactive</option>
                  </select></div>
                <div className="flex justify-end gap-4 px-6 -mt-1">
                  <button type="submit" 
                  disabled={!customerform.name || !customerform.contact_info || !customerform.status}
                  className="w-full py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800">
                    {editcustomer ?'Edit' : 'Add' }
                  </button>
                  <button onClick={() => setShowModal(false)} className="w-full py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Cancel
                  </button>

                </div>
              </form>
            </div></div>
        )}

      </div>
    </>
  )
}

export default Customer
