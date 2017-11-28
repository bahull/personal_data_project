import React, { Component } from "react";

import axios from "axios";

class Tryitout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };
  }

  newHandler() {
    axios.get("/api/getFile").then(response => {
      console.log(response.data[0].exceldata);
    });
  }

  //   sendToNode() {
  //     axios
  //       .post("/api/retrieveFile", {
  //         file: this.state.file
  //       })
  //       .then(response => {
  //         console.log(response);
  //       })
  //       .catch(console.log);
  //   }

  //   uploader(event) {
  //     event.preventDefault();

  //     let reader = new FileReader();
  //     let file = event.target.files[0];
  //     console.log("file: ", file);
  //     this.setState({ fileName: file.name });

  //     reader.onload = () => {
  //       csv.parse(reader.result, (err, data) => {
  //         this.setState({
  //           file: data
  //         });

  //         this.sendToNode();
  //       });
  //     };

  //     // reader.readAsDataURL(file);
  //     reader.readAsBinaryString(file);
  //   }

  render() {
    return (
      <div>
        <button onClick={this.newHandler}>HellO!</button>
      </div>
    );
  }
}

export default Tryitout;
