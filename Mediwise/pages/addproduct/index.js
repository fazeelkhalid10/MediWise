import React, { useEffect, useRef, useState } from 'react';
import styles from "@/styles/addmed.module.css";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useSession } from 'next-auth/react'; 
import { getSession } from 'next-auth/react';
// Mock data for existing medicines
const existingMedicines = [
  { id: 1, name: 'Aspirin', company: 'Bayer', price: 5.99, quantity: 100 },
  { id: 2, name: 'Ibuprofen', company: 'Advil', price: 7.99, quantity: 50 },
  { id: 3, name: 'Acetaminophen', company: 'Tylenol', price: 6.99, quantity: 75 },
  // Add more mock data as needed
];
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login', 
        permanent: false,
      },
    };
  }

  return {
    props: { session }, 
  };
}


const AddMedicine = ({session}) => {
  const companyNameRef = useRef(null);
  const medicineNameRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);
  const descriptionRef = useRef(null);

  const [medicines, setMedicines] = useState(existingMedicines);
  useEffect(()=>{


    fetch('/api/getmed',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body:JSON.stringify({userid:session.user.id})
    
    
          }).then((res)=>res.json()).then((data)=>{console.log("Added successfully")
    
            console.log(data.data);
            setMedicines(data.data)
          })
    
    
        },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    const medicineData = {
      
      name: medicineNameRef.current?.value || '',
      company: companyNameRef.current?.value || '',
      price: Number(priceRef.current?.value) || 0,
      quantity: Number(quantityRef.current?.value) || 0,
      description: descriptionRef.current?.value || '',
      userid:session.user.id
    };
  
    console.log(medicineData)
    fetch('/api/product',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body:JSON.stringify(medicineData)


      }).then((res)=>res.json()).then((data)=>{console.log("Added successfully")

        console.log(data.data);
        setMedicines(data.data)
      })

    //setMedicines([...medicines, medicineData]);
    console.log('Medicine data:', medicineData);
    // Reset fields after submission
    if (companyNameRef.current) companyNameRef.current.value = '';
    if (medicineNameRef.current) medicineNameRef.current.value = '';
    if (priceRef.current) priceRef.current.value = '';
    if (quantityRef.current) quantityRef.current.value = '';
    if (descriptionRef.current) descriptionRef.current.value = '';
  };

  return (
    <>
      <Header/>
      <div className={styles.pageContainer}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Add New Medicine</h2>
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="companyName" className={styles.label}>Company Name</label>
              <input
                type="text"
                id="companyName"
                ref={companyNameRef}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="medicineName" className={styles.label}>Medicine Name</label>
              <input
                type="text"
                id="medicineName"
                ref={medicineNameRef}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>Price</label>
              <input
                type="number"
                id="price"
                ref={priceRef}
                required
                min="0"
                step="0.01"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="quantity" className={styles.label}>Quantity</label>
              <input
                type="number"
                id="quantity"
                ref={quantityRef}
                required
                min="0"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>Description</label>
              <textarea
                id="description"
                ref={descriptionRef}
                required
                className={styles.textarea}
              />
            </div>
            <button onClick={handleSubmit} className={styles.submitButton}>Add Medicine</button>
          </div>
        </div>
        <div className={styles.tableSection}>
          <h2 className={styles.sectionTitle}>Existing Medicines</h2>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>{medicine.name}</td>
                    <td>{medicine.company}</td>
                    <td>${medicine.price.toFixed(2)}</td>
                    <td>{medicine.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AddMedicine;

