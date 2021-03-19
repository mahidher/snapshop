import React, { useEffect, useState } from "react";
import { Button, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { productDetails, createProductReview } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import { addCart, removeCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen({ match, history }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDet = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDet;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    } else {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(productDetails(match.params.id));
    }
  }, [dispatch, match.params.id, successProductReview]);

  function addToCartHandler() {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <div>
      <Link to='/'>
        <Button variant='light'>Go Back</Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='my-2'>
            <Col md={5}>
              <Image src={product.image} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='font-weight-bolder'>
                  <h5>{product.name}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={product.rating}></Rating>
                  <p className='my-0'>{`${product.numReviews} reviews`}</p>
                </ListGroup.Item>

                <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:{product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='py-2'>
                    <Row>
                      <Col md={6}>Price:</Col>
                      <Col md={6}>$ {product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='py-2'>
                    <Row>
                      <Col md={6}>Status:</Col>
                      <Col md={6}>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item className='py-2'>
                      <Row>
                        <Col md={6}>Qty:</Col>
                        <Col md={6}>
                          <Form.Control
                            style={{ padding: "2px", height: "40px" }}
                            as='select'
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option value={x + 1} key={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className='py-2 mx-auto'>
                    <Button
                      className='py-2'
                      variant='dark'
                      onClick={addToCartHandler}
                      disabled={product.countInStock > 0 ? false : true}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='pt-3'>
            <Col md={6}>
              <h5>Reviews</h5>

              {product.reviews.length === 0 && (
                <Message variant='info'>No reviews yet!.</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review, index) => (
                  <ListGroup.Item key={review._id}>
                    <Row>
                      <Col md={1}>{index + 1}.</Col>
                      <Col>
                        <boldweight>{review.name}</boldweight>
                        <Rating rating={review.rating}></Rating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h6>Write A Customer Review</h6>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo && userInfo.name ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          size='sm'
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select..</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          row='3'
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' size='sm' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Login</Link> to write a review!
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ProductScreen;
