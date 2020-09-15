import React, { useState, useRef, useEffect, Fragment } from "react";
import {  Button, Empty, Col, Row, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as ml5 from "ml5";
import GrapeDisease from '../assets/img/grape-disease.jpg';

const columns = [
  { title: 'Label', dataIndex: 'label', key: 'label' },
  { title: 'Confidence', dataIndex: 'confidence', key: 'confidence' }
];

function Home() {
  const [image, setImage] = useState({
    file: GrapeDisease,
    name: "Grape Disease"
  });
  const [predictions, setPredictions] = useState([]);

  const input = useRef();

  const classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }
    // Put the image to classify inside a variable
    const image = document.getElementById('image');
    // Make a prediction with a selected image
    classifier.predict(image, 5, function(err, results) {
      if (err) {
        setPredictions([{ error: true, message: err.message }]);
      } else {
        // Set Result to State
        console.log(results);
        setPredictions(results.map((each, i) => ({ ...each, key: i })));
      }
    });
  }

  useEffect(classifyImg, []);
 
  const preview = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        const { result } = e.target;
        setImage({
          ...image,
          file: result,
          name: file.name
        });
        classifyImg();
      });

      reader.readAsDataURL(file);
    }
  }; 
  
  return (
    <Fragment>
      <h1>Plant Disease Dectection</h1>
      <Row>
        <Col span={12}>
          <input
            type="file"
            id="file-input"
            hidden="hidden"
            ref={input}
            onChange={preview}
          />

          <div className="img-container">
            {image.file ? <img src={image.file} id="image" alt={image.name} /> : <Empty description={"No Image"} />}
          </div>

          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => input.current.click()}
          >
            Select Image
        </Button>
        </Col>
        <Col span={12}>
          <Table
            dataSource={predictions}
            columns={columns}
            bordered={true}
            pagination={false}
          />;
        </Col>
      </Row>
    </Fragment>
  );
}

export default Home;
