import {
  Container,
  Row,
  Col,
  Form,
  Label,
  InputGroupAddon,
  Input,
  FormGroup,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import ResultRow from "./ResultRow";
import { FaUserAlt, FaDollarSign } from 'react-icons/fa'
import './assets/styles.css'
export default function App() {
  const tips = [5, 10, 15, 25, 50];
  const [billValidateLabel, setBillValidateLabel] = useState('');
  const [peopleValidateLabel, setPeopleValidateLabel] = useState('')

  const [data, setData] = useState({
    bill: 0,
    people: 0,
    tipPercent: 0.00,
    tipAmount: 0.00,
    Total: 0,
  })
  
  const calculateAndDivide = ()=> {
    let Bill = parseFloat(data.bill);
    let tipAmountPerPerson = (Bill * (data.tipPercent / 100) / data.people);
    let TotalMoneyPerPerson = ((Bill / parseInt(data.people)) + tipAmountPerPerson);
    setData({
      ...data,
      tipAmount: tipAmountPerPerson,
      Total: TotalMoneyPerPerson,
    })
  }
  const cleanResults = ()=> {
    setData({
      ...data,
      tipAmount: 0,
      Total: 0,
    })
  }
  useEffect(() => {
    if (data.bill > 0 && data.people > 0) {
      calculateAndDivide();
    } else {
      cleanResults();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.bill, data.people, data.tipPercent])
  function tipButton(e, tip) {
    e.preventDefault();
    setData({ ...data, tipPercent: tip });
  }
 
  function handleBillInput(e) {
    if (e.target.value < 0) {
      setBillValidateLabel("Bill Can't be less than 0")
      setData({ ...data, bill: 0 })
    } else {
      setBillValidateLabel("")
      setData({ ...data, bill: e.target.value })
    }
  }
  function handlePeopleInput(e) {
    if (e.target.value <= 0) {
      setPeopleValidateLabel("People Can't be less than 1");
      setData({ ...data, people: 0 });
    } else {
      setPeopleValidateLabel("");
      setData({ ...data, people: e.target.value });
    }
  }
  function clean(){
    document.getElementById('Bill').value='';
    document.getElementById('CustomTip').value='';
    document.getElementById('NumberOfPeople').value='';
    setData({
      bill: 0,
      people: 0,
      tipPercent: 0.00,
      tipAmount: 0.00,
      Total: 0,
    })
  }
  return (
    <React.Fragment>
      <Container className="Container App">
        <Row className="RowPrimary">
          <Col md={6} xs={12}>
            <Form className="FormLayout">
              <FormGroup>
                <Label className="inputLabel">Bill</Label>
                <Label className="inputLabel Validate" id="BillValidate">{billValidateLabel}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="addOnInputSympol"><FaDollarSign className="addOnInputIcon" /></InputGroupText>
                  </InputGroupAddon>{" "}
                  <Input placeholder="0"  step="0.01" min="0" onChange={handleBillInput} className={`FormInput ${billValidateLabel===''?billValidateLabel:"Invalid"}`} type="number" id="Bill" name="Bill" ></Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label className="inputLabel">Select Tip %</Label>
                <InputGroup>
                  <Container style={{ padding: "0" }}>
                    <Row>
                      {
                        tips.map((tip, i) => {
                          return <Col key={i} xs={6} md={4}>
                            <button key={i}
                              className={`${data.tipPercent === tip ? "Button Group Inverted" : "Button Group"}`}
                              onClick={(e) => tipButton(e, tip)}
                            >
                              {tip}%
                            </button>
                          </Col>
                        })
                      }
                      <Col xs={6} md={4}>
                        <Input
                        className="FormInput"
                        type="number"
                        placeholder="CUSTOM" min="0"
                        id="CustomTip"
                        onChange={(e) =>  setData({ ...data, tipPercent: e.target.value })}
                      >
                        Custom
                      </Input>
                      </Col>
                    </Row>
                  </Container>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label className="inputLabel">Number of People</Label>
                <Label className="inputLabel Validate" id="PeopleValidate">{peopleValidateLabel}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="addOnInputSympol"><FaUserAlt className="addOnInputIcon" /></InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    id="NumberOfPeople"
                    name="NumberOfPeople"
                    className={`FormInput ${peopleValidateLabel===''?peopleValidateLabel:"Invalid"}`}
                    placeholder="0"
                    min="1"
                    onChange={handlePeopleInput}
                  ></Input>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
          <Col md={6} xs={12}>
            <Container className="Container Result">
              <ResultRow
                data={{
                  title: "Tip Amount",
                  subTitle: "/  person",
                  price: `$${data.tipAmount.toFixed(2)}`,
                }}
              />
              <ResultRow
                data={{
                  title: "Total",
                  subTitle: "/  person",
                  price: `$${data.Total.toFixed(2)}`,
                }}
              />
              <Row style={{ alignSelf: "end" }}>
                <Col xs={12}>
                  <button className="Button Reset" 
                  onClick={clean}
                  disabled={
                    parseFloat(data.bill) !== 0 || parseInt(data.people) !== 0 || data.tipPercent !== 0 ? 
                    false:true
                    }>RESET</button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
