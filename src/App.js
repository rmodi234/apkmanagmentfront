import React from 'react';
import Axios from 'axios';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Loader from 'react-loader-spinner'
import {Editor, EditorState} from 'draft-js'
const urlbase = 'http://159.89.166.148:3000'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloader: 0,
      // isdata:0
      tabledata:[],
      editorState: EditorState.createEmpty()
      
    };
  }
 async componentDidMount(){
    const url = `${urlbase}/apps/all`
    const data=  await Axios.get(url).then(res=>this.setState({tabledata:res.data.data})).catch(err=>console.log(err))
    // console.log(data.data)
    
  }
  handleupload = (e) => {
    e.preventDefault();
    this.setState({
      isloader: 1
    })
    const url = `${urlbase}/apps/upload`
    const data = new FormData()
    data.append('emails', this.Emails.value)
    data.append('name', this.Name.value)
    data.append('file', this.uploadInput.files[0])
    Axios.post(url, data).then(res => { if (res.status === 200) { this.setState({ isloader: 0 }) } }).catch(err => console.log('err', err))
  }
  
  render() {
    if (this.state.isloader) {
      return <div style={{ position: "absolute", top: "48%", left: "45%" }}> <Loader type="ThreeDots" color="#somecolor" height={80} width={80} /></div>
    }
    // console.log (this.state.tabledata)
    const  tableone = this.state.tabledata.length ? <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Apk Name</th>
        <th>Emails</th>
        <th>Download</th>
      </tr>
    </thead>
    <tbody>
      {this.state.tabledata.map((u,i)=><tr key={i}>
        <td>{i+1}</td>
        <td>{u.apkversion}</td>
        <td>{u.emails}</td>
      <td>{u.url}</td>
      </tr>)}
      
    </tbody>
  </Table>  : ''  

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <h1 style={{ padding: "1% 5% 0 5%" }}>Upload Apk</h1>
        <form onSubmit={this.handleupload} style={{ padding: "1% 5% 0 5%" }} method="post">
          <input className="form-control" ref={(ref) => { this.Name = ref; }} type="name" placeholder="Apk name" required /><br />
          <input className="form-control" ref={(ref) => { this.Emails = ref; }} type="emails" placeholder="emails" required /><br />
          <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" required /><br />
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
          <button className="btn btn-primary" type="submit">upload</button>
        </form>
        <br/>
        {tableone}
        
      </>
    );
  }
}

export default App;
// import React from 'react'
// import {Editor, EditorState} from 'draft-js';
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};
//     this.onChange = editorState => this.setState({editorState});
//   }
//   render() {
//     return (
//     <div><Editor editorState={this.state.editorState} onChange={this.onChange} /></div>  
//     );
//   }
// }

// export default App
