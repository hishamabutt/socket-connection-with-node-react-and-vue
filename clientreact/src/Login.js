import React,{useState} from 'react'
import { Link } from 'react-router-dom'





export default function Login() {

    const [formData, setFormData] = useState({
        company_id: '',
        user_id: '',
        token:''
      });
    
      const { company_id, user_id, token } = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div>
            <label>Company Id : </label>
            <input 
            type='text' 
            name='company_id'
            value={company_id}
            onChange={(e) => onChange(e)} 
            /><br/>
            <label>User Id : </label>
            <input type='text'
             name='user_id'
            value={user_id}
            onChange={(e) => onChange(e)}
             /><br/>
            <label>Token Id : </label>
            <input type='text' 
            name='token'
            value={token}
            onChange={(e) => onChange(e)} 
            /><br/>
            <Link 
            to={{
            pathname: '/home',
            state: { data: formData },
            }}
             >
              Home
            </Link>
        </div>
    )
}
