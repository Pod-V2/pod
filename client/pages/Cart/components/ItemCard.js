import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function ItemCard(props) {
  const handleRemoveBtnClick = () => {
    props.handleRemoveBtnClickParent(props.id);
  }
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
        //   height="140"
          image={props.img_url}
          alt={props.description}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleRemoveBtnClick}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}