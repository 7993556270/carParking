import React from 'react'
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const[inputValue,setInputValue]=useState();
  // const [show, setShow] = useState(false);
    const navi = useNavigate();

    const allocate=()=>{
        console.log(inputValue);
        localStorage.setItem("value",inputValue);
        navi('/allocate');
    }

  return (
    <div className='App'>
      <Card style={{ width: '18rem', margin: "auto", marginTop: "20px" }}>
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCHbq5Em5m81dtQTucd8Mh7nRQ7GX6DkNHg&usqp=CAU" />
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter a Number</Form.Label>
              <Form.Control type="number" placeholder="Enter " value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
            </Form.Group>

            <Button variant="primary" disabled={!inputValue} onClick={allocate}>
              Submit
            </Button>
          </Form>

        </Card.Body>
      </Card>

    </div>
  )
}

export default Home;
