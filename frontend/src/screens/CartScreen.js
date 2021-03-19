import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../actions/cartActions";

function CartScreen({ match, history, location }) {
  const id = match.params.id;
  const qty = location.search.split("=")[1];
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, loading } = cart;
  useEffect(() => {
    if (id != null) {
      dispatch(addCart(id, qty));
    }
  }, [dispatch, id, qty]);
  function checkOutHandler() {
    history.push("/login?redirect=shipping");
  }
  function removeFromCartHandler(id) {
    dispatch(removeCart(id));
  }
  return (
    <div>
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <Message variant='warning'>
          Your cart is empty.<Link to='/'>Go back</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} rounded fluid />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        style={{ padding: "2px", height: "40px" }}
                        as='select'
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addCart(item.product, Number(e.target.value))
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type='button'
                        variant='light'
                        style={{ padding: "7px" }}
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i class='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h5>
                    SUBTOTAL -{" "}
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items
                  </h5>
                  Amount to Pay - $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default CartScreen;
