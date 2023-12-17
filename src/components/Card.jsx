import React from 'react';
import { Card, Avatar} from 'antd';

const Card = ({username, avatar, email, firstName, lastName, Bio}) => {
    return (
      <Card style={{margin: "10px", maxWidth: "100%"}}>
         {/* <Card.Meta
            avatar={<Avatar src={avatar} />}
        /> */}
        <p>{username}</p>
        <h5>{Bio}</h5>
        {/* <h6>First Name: {firstName}</h6>
        <h6>Last Name: {lastName}</h6>
        <h6>Email: {email}</h6> */}
      </Card>
    );
  };

export default Card;