import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, Modal } from "react-bootstrap";

// import axios from "axios";
import { json, useNavigate } from "react-router-dom";

const ParkkAllocations = () => {
  const [date, setDate] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
  );
  const navi = useNavigate();
  const [show, setShow] = useState("");
  const [sin, setsin] = useState(false);
  const display = localStorage.getItem("value");
  const [cardd, setcardd] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deallocateObj, setDeallocateObj] = useState(null);
  const [vehicleNumber,setVehicleNumber] = useState(null);

  useEffect(() => {
    getNoOfCrds();
  }, []);

  const locations = [
    "Nandini Layout",
    "MahaLakshmi Layout",
    "Hsr Layout",
    "Jalahalli",
    "BTM Layout",
    "Nelamangala",
    "KorMangala",
    "Indiranagar",
  ];

  const location = locations[Math.floor(Math.random() * locations.length)];

  const getNoOfCrds = () => {
    const arr = (localStorage.getItem('details') ) ? JSON.parse(localStorage.getItem('details')) :[];

    if(arr?.length === 0){
      for (let i = 0; i < display; i++) {
        arr.push({
          id: Math.floor(Math.random() * 10000),
          isAllocated: false,
          locationName: location,
        });
      }
    }
    setcardd(arr);
    updateLocalStorage(arr);
  };

  const updateLocalStorage = data => {
    localStorage.setItem("details",JSON.stringify(data));
  }

  const bookParking = (a, e) => {
    e.preventDefault();

    const vehicle = prompt("Enter Vehicle Number");

    let isVehiclePresent = cardd.map(item => item.vehicleNum ).includes(vehicle);

    if (isVehiclePresent) {
      alert(`Vehicle with this number ${vehicle} is already parked here`);
    } else {
      let parkingData = {
        ...a,
        isAllocated:true,
        parkedTime : new Date(),
        timetoDisplay: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        }),
        vehicleNum: vehicle
      }

      let upd_obj = cardd.findIndex((obj => obj.id == parkingData.id));
      let dummyArr = cardd;

      dummyArr[upd_obj] = parkingData;
      setcardd(dummyArr);
      updateLocalStorage(dummyArr);
      setsin(!sin)
      axios({
        method: "POST",
        url: "https://httpstat.us/200",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        // console.log(a);
      });
    }
  };

  const detailpage = () => {
    navi("/parked");
  };

  const dellocate=(obj)=>{
    setDeallocateObj(obj);
    handleShow()
  }

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    return hours;
    
    // if (seconds < 60) return seconds + " Sec";
    // else if (minutes < 60) return minutes + " Min";
    // else if (hours < 24) return hours + " Hrs";
    // else return days + " Days"
  }

  const renderBill = () => {
    let totalHours = msToTime(new Date() - new Date(deallocateObj.parkedTime));
    let totalPay = 10;
    if(totalHours > 2){
      totalPay += ((Math.round(totalHours) - 2))*10
    }
    return(
      <Modal show={showModal} onHide={handleClose} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Bill Amount :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Thank you for using our parking. <br/><br/> */}
          <p><i>Base Pay is 10$ for first 2 hours. After 2 hours, 10$/hour will be charged. </i> </p>
          <b>Parked Time : </b> {Math.ceil(totalHours) +' Hours'} <br/><br/>
          <b>Base pay for 2 hours : </b> 10$ <br/> 
          {(totalHours > 2) && <div>
            
            <b>Bill for remaining {Math.round(totalHours - 2)} hours: </b> {Math.round((totalHours - 2))*10} $
          </div>}<br/> 
          <b>Total pay :  {totalPay} $ </b><br/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => payBill(totalPay)}>
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const payBill = (totalPay) => {
    handleClose();
    axios({
      method: "POST",
      url: "https://httpstat.us/200",
      data: {"car-registration":deallocateObj?.vehicleNum,"charge":totalPay},
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      alert('Bill paid successfully !!');
      handleDeallocate();
      // navi('/allocate');
    }).catch(err => {
      alert('Bill paid successfully !!');
      handleDeallocate();
      // navi('/allocate')
    })
  }

  const handleDeallocate = () => {
    let updatedData = {
      ...deallocateObj,
      isAllocated:false,
      parkedTime : null,
      timetoDisplay: null,
      vehicleNum: null
    }

    let upd_obj = cardd.findIndex((obj => obj.id == updatedData.id));
    let dummyArr = cardd;

    dummyArr[upd_obj] = updatedData;
    setcardd(dummyArr);
    updateLocalStorage(dummyArr);
    setDeallocateObj(null);
  }

  function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
  }

  const parkRandomly = () => {

    let isVehiclePresent = cardd.map(item => item.vehicleNum ).includes(vehicleNumber);

    if(isVehiclePresent){
      alert(`Vehicle with this number ${vehicleNumber} is already parked here`);
    }else{
      let randomNum = 0;
      let availableSlots = cardd.map((item, index) => {
        if(item.isAllocated === false) return index
      })
  
      availableSlots = availableSlots.filter(item => item !== undefined)
  
      if(availableSlots.length === 0){
        alert('Sorry. All Parking Slots are booked currently')
      }else{
        while(!availableSlots.includes(randomNum)){
          randomNum = randomNumber(0,JSON.parse(localStorage.getItem('value')))
        }
    
        let toBeParkedSlot = cardd[randomNum];
        console.log(vehicleNumber,randomNum,availableSlots.includes(randomNum));
    
        let parkingData = {
          ...toBeParkedSlot,
          isAllocated:true,
          parkedTime : new Date(),
          timetoDisplay: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          }),
          vehicleNum: vehicleNumber
        }
    
        let upd_obj = cardd.findIndex((obj => obj.id == parkingData.id));
        let dummyArr = cardd;
    
        dummyArr[upd_obj] = parkingData;
        setcardd(dummyArr);
        updateLocalStorage(dummyArr);
        setsin(!sin)
        axios({
          method: "POST",
          url: "https://httpstat.us/200",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log(res);
          // console.log(a);
        });
      }
    }
  }

  return (
    <div>
      <h2 data-testid='heading' style={{ textAlign: "center" }}>Parking allocations</h2>
      {deallocateObj && renderBill()}
        <InputGroup style={{padding:'1% 5% 1% 5%'}} className="p-6">
          <Form.Control
            placeholder="Enter Vehicle Number"
            aria-label="Vehicle Number"
            aria-describedby="basic-addon2"
            onChange={e => setVehicleNumber(e.target.value)}
            data-testid="inputElement"
          /> &nbsp; &nbsp;
          <Button variant="btn btn-primary" data-testid="submit" id="button-addon2" onClick={vehicleNumber && parkRandomly}>
            Submit
          </Button>
        </InputGroup>
      <span>
        {cardd.map((s, index) => {
          return (
            <Card
              className="parkingSlot"
              key={index}
              border={s.isAllocated ? "danger" : "success"}
              style={{
                width: "18rem",
                display: "inline-block",
                margin: "10px",
                // border: '5px solid black'
              }}
            >
              <Card.Body>
                <Card.Title>Parking Slot {index + 1} <span className={s.isAllocated ? 'text-danger font-weight-bold' : 'text-success font-weight-bold'}> {s.isAllocated ? '• Engaged' : '• Available'}</span></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Location:<b> {s.locationName}</b>
                </Card.Subtitle>
                <Card.Text> Vehicle Number : {s.isAllocated ? <span style={{fontWeight:'bolder'}}>{s.vehicleNum} </span>: <span style={{fontStyle:'italic'}}>Not yet reserved</span> }</Card.Text>
                <Card.Text>Parked Time : {s.isAllocated ? <span style={{fontWeight:'bolder'}}>{s.timetoDisplay}</span> :  <span style={{fontStyle:'italic'}}>Not yet reserved</span>}</Card.Text>
                <span style={{ alignSelf: "center" }}>
                  {s.isAllocated ? 
                    <Button className="btn btn-danger"  data-testid={`deallocate${index}`} onClick={() => dellocate(s)}>Deallocate</Button>
                  :<Button className="BookButton btn btn-success" data-testid={`slot${index}`} onClick={(e) => bookParking(s, e)}>Book</Button>}
                </span>
              </Card.Body>
            </Card>
          );
        })}
      </span>
    </div>
  );
};

export default ParkkAllocations;
