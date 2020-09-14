import React, { useState, useRef } from "react";
import {  Button, Empty } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



function Home() {
  const [image, setImage] = useState({
    file: null,
    name: ""
  });

  const input = useRef();
 
  const preview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader()

    reader.addEventListener("load", (e) => {
      const { result } = e.target;
      setImage({
        ...image,
        file: result,
        name: file.name
      })
    });

    reader.readAsDataURL(file);
  }
 
  
  return ( 
      <div>
        <h1>Welcome to Home Page</h1>

        <input 
          type="file" 
          id="file-input" 
          hidden="hidden" 
          ref={input} 
          onChange={preview}
        />
        
        <Button 
          type="primary" 
          icon={<UploadOutlined />} 
          onClick={() => input.current.click()} 
        >
          Select Image
        </Button>
        

        <div className="img-container">
          {image.file? <img src={image.file} alt={image.name}/> : <Empty description={"No Image"} /> }
        </div>

        <Button type="primary" style={{margin: "0 0 .5rem "}}>Upload Image</Button>
      </div>
  );
}

export default Home;
