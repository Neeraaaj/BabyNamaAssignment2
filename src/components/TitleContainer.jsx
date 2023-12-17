import React, { useState } from 'react';
import { Card, Avatar} from 'antd';
import '../App.css'

const TitleContainer = ({title, avatar}) => {
    const [imageError, setImageError] = useState(false);
    return (
      <Card style={{margin: "10px", maxWidth: "100%", border: '1px solid gray'}} className='card-title'>
         <Card.Meta
            avatar={<Avatar src={imageError ? "https://static.vecteezy.com/system/resources/thumbnails/014/550/299/small/download-icon-website-buffer-loader-a-spinning-circle-to-download-information-on-the-website-png.png" : avatar} onError={() => setImageError(true)} />}
            title={`${title}`}
        />
      </Card>
    );
  };

export default TitleContainer;