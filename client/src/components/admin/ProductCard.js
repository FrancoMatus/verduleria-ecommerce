import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  media: {
    height: 140,
  },
});

export default function ProductCard({
  id,
  name,
  description,
  stock,
  price,
  setItemOnLS,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://ep01.epimg.net/elpais/imagenes/2017/09/18/buenavida/1505749730_043697_1505751011_noticia_normal.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography>
            {Number(stock) > 0 ? `Disponibles: ${stock}` : "No hay stock"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography>${price}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Ver más
        </Button>

        <Button
          size="small"
          color="primary"
          disabled={Number(stock) === 0}
          onClick={() => setItemOnLS({ id, name, stock, price })}
        >
          Añadir al carrito
        </Button>
      </CardActions>
    </Card>
  );
}
