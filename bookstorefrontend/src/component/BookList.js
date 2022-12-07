import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks,searchBook,addBook } from "../slices/bookslice";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const BookList =()=>{

    const initial ={
        name:'',
        phone:'',
        email:'',
        address:'',
        city:'',
        state:'',

    }
    const[name,setName]=useState('');
    const[phone,setPhone] = useState('');
    const[email,setEmail]=useState('');
    const[address,setAddress] = useState('');
    const[city,setCity] =useState('');
    const[state,setState]=useState('');
//   const [userData,setUserData] = useState(initial);
  const [isShow, invokeModal] = useState(false)
  const [bookId,setBookId] = useState('');
  const[errors,setErrors]=useState({});

    const dispatch = useDispatch();
    const {books }= useSelector((state)=>state.bookSlice);
    console.log("books",books)

    useEffect(()=>{
        dispatch(fetchBooks())
        // searchHandle()
    },[])
   
    const initModal = (id) => {
        setBookId(id)
      return invokeModal(!false)
    }

    const validateRegister = (values) => {
        const errors = {};
        
        let isValid = true;
      
       
      
        if (!values.name) {
          errors.name = "name is required";
          isValid = false;
        } 
          if (!values.phone) {
          errors.phone = "phone is required";
          isValid = false;
        }
          if (!values.email) {
          errors.email = "email name is required";
          isValid = false;
        }
        if (!values.address) {
            errors.address = "address is required";
            isValid = false;
          } 
            if (!values.city) {
            errors.city = "city is required";
            isValid = false;
          }
            if (!values.state) {
            errors.state = "state is required";
            isValid = false;
          }
        return { isValid, errors };
      };
      
    const onSubmit = async(e)=>{
        e.preventDefault();

        const validation = validateRegister({
            name,phone,email,address,city,state
          });
        
          setErrors(validation.errors);
          if (!validation.isValid) {
            return;
          }
        const book ={bookId,name,phone,email,address,city,state}
     console.log("bookddd",book)
         
      dispatch(addBook(book))
      
      invokeModal(false)
      setName('');
      setState('');
      setCity('');
      setPhone('');
      setEmail('');
      setAddress('');

    
    }

    // const handleChangeInputValue =(e)=>{
    //     const {name,value} = e.target;
    //     setUserData({
    //         ...userData,
    //         [name]:value
    //     })
    
    // }

    const closeModel = () => {
        invokeModal(false)
      }
  
    const searchHandle = async(event)=>{
        let key = event.target.value;
        
        dispatch(searchBook(key))
    }
    

return(
    <>
    <h1> Book Store</h1>
  
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={closeModel}>
          <Modal.Title>React Modal Popover Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
          Name:
        <input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
        {errors.name && (
                                <>{errors.name}</>
                              )} 
        <br/>
        Phone:
        <input type="number" name="phone" value={phone} onChange={(e)=> setPhone(e.target.value)} />
        {errors.phone && (
                                <>{errors.phone}</>
                              )} 
         <br/>
        Email:
        <input type="email" name="email"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
        {errors.email && (
                                <>{errors.email}</>
                              )} 
        <br/>
        Address details:
        <br/>
        address:
        <input type="text" name="address"  value={address} onChange={(e)=> setAddress(e.target.value)}/>
        {errors.address && (
                                <>{errors.address}</>
                              )} 
        <br/>
        city:
        <input type="text" name="city" value={city} onChange={(e)=> setCity(e.target.value)} />
        {errors.city && (
                                <>{errors.city}</>
                              )} 
        <br/>
        state:
        <input type="text" name="state" value={state} onChange={(e)=> setState(e.target.value)} />
        {errors.state && (
                                <>{errors.state}</>
                              )} 
      


        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModel}>
            Close
          </Button>
          
          <Button variant="dark" onClick={onSubmit}>
            Store
          </Button>
        </Modal.Footer>
      </Modal>
    
    <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             />
  
    <table>
            <thead>
                <tr>
                    <td>Title</td>
                   <td>Description</td>
                   
                </tr>
            </thead>
        
      
        {  books?.map((el)=>{

            return(
                <tr key={el.id}>
                    <td>{el.title}</td>
                    <td>{el.description}</td>
                    <td> <Button variant="success" onClick={()=>initModal(el._id)}>
        Open Modal
      </Button></td>
                </tr>
            )
        })}
        </table>
    </>
)

}


export default BookList