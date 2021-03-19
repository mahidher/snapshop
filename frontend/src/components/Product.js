import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className='my-3 p-2'>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant='top' src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title
            as='div'
            className='font-weight-bold'
            style={{ minHeight: "76.8px" }}
          >
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text as='div' className='my-3'>
          <Rating
            rating={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text>{`${product.numReviews} reviews`}</Card.Text>
        <Card.Text as='h5'> $ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
