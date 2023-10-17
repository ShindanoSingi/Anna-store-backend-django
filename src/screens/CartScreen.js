import React, { useEffect } from "react";
import {
      Form,
      Button,
      Card,
      Col,
      Image,
      ListGroup,
      Row
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen() {
      const productId = useParams().id;
      const navigate = useNavigate();

      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;

      const dispatch = useDispatch();

      const cart = useSelector((state) => state.cart);
      const { cartItems } = cart;

      console.log(cartItems)

      useEffect(() => {
            if (productId) {
                  dispatch(addToCart(productId, qty));
            }
      }, [dispatch, productId, qty]);

      const removeFromCartHandler = (productId) => {
            dispatch(removeFromCart(productId));
      };

        const checkoutHandler = () => {
            navigate('/login?redirect=shipping')
        }

      return (
            <Row>
                  <Col md={8}>
                        <h1>Shopping Cart</h1>
                        {cartItems.length === 0 ? (
                              <Message variant="info">
                                    Your cart is empty{" "}
                                    <Link to="/">Go Back</Link>
                              </Message>
                        ) : (
                              <ListGroup variant="flush">
                                    {cartItems.map((item) => (
                                          <ListGroup.Item key={item.product}>
                                                <Row>
                                                      <Col md={2}>
                                                            <Image className="image"
                                                                  alt={
                                                                        item.name
                                                                  }
                                                                  fluid
                                                                  rounded
                                                                  src={
                                                                        item.image
                                                                  }
                                                            />
                                                      </Col>
                                                      <Col md={3}>
                                                            <Link
                                                                  to={`/product/${item.product}`}
                                                            >
                                                                  {item.name}
                                                            </Link>
                                                      </Col>
                                                      <Col md={2}>
                                                            ${item.price}
                                                      </Col>
                                                      <Col md={3}>
                                                            <Form.Control
                                                                  as="select"
                                                                  value={item.qty}
                                                                  onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                            >
                                                                  {[
                                                                        ...Array(item.countInStock).keys()].map((x) => (
                                                                        <option
                                                                        key={ x + 1 }
                                                                        value={x + 1 }
                                                                        >
                                                                              {x + 1}
                                                                        </option>
                                                                  ))}
                                                            </Form.Control>
                                                      </Col>

                                                      <Col mss={1}>
                                                            <Button
                                                                  type="button"
                                                                  variant="light"
                                                                  onClick={() =>
                                                                        removeFromCartHandler(
                                                                              item.product
                                                                        )
                                                                  }
                                                            >
                                                                  <i className="fas fa-trash"></i>
                                                            </Button>
                                                      </Col>
                                                </Row>
                                          </ListGroup.Item>
                                    ))}
                              </ListGroup>
                        )}
                  </Col>

                  <Col md={4}>
                        <Card>
                              <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Subtotal  ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed()}
                                    </ListGroup.Item>
                              </ListGroup>

                                <ListGroup.Item className="p-2">
                                    <Button
                                    type="button"
                                    className="btn-block w-100 "
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                    >
                                        Proceed To checkout
                                    </Button>
                                </ListGroup.Item>
                        </Card>
                  </Col>
            </Row>
      );
}

export default CartScreen;
