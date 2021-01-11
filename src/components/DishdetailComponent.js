import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle,ListGroup,ListGroupItem,Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalBody,ModalHeader,Row,Label,Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

   function RenderComments({comments, postComment, dishId}){
        if (comments != null){
           return(
               <div>
                   <h4>Comment</h4>
                   {
                       comments.map(e=>{
                           console.log(e)
                           return(
                               <div key={e.id}><br />
                                   <div>{e.comment}</div><br />
                                   <div>--{e.author} , 
                                       {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'})
                                       .format(new Date(Date.parse(e.date)))}
                                    </div>
                               </div>
                           )
                       })
                   }
                   <br />
                   <CommentForm dishId={dishId} postComment={postComment} />
               </div>
           )
          
        }
        else {
            return(
                <div></div>
            )
            
        }
    }

   function RenderDish({dish}) {
        return(
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    const DishDetail = (props) => {
        console.log("DishDetail Component render is invoke")

        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        
        if(props.dish != null){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
        
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments 
                                comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id}
                             />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
      
    }

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends React.Component{
constructor(props) {
super(props);

this.state = {
    isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)

}

    toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
    }
    handleSubmit(values){
        this.toggleModal()
    /* this.setState({
        isModalOpen: false
        }); */
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return (
            <div>
                <Button onClick={this.toggleModal} color="light"><span className="fas fa-pen"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.input type="number" model=".rating" id="rating" name="rating"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                             minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        rows="6"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
            )
    }
}
export default DishDetail