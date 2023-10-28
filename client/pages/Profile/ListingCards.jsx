import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
    minHeight: '100%'
  },
  media: {
    height: 140,
  },
});

export default function ListingCard(props) {
  const classes = useStyles();
  console.log(props)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={props.productTitle}
          image={props.imgUrl}
          title={props.productTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.productTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}