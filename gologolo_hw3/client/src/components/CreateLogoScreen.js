import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margins: Int!
        ) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margins: $margins
            ) {
            _id
        }
    }
`;

const defaultValues = {
        TEXT: "goLogoLo",
        COLOR: "#000000",
        FONT_SIZE: 24,
        BACKGROUND_COLOR: "#FFFFFF",
        BORDER_COlOR: "#000000",
        BORDER_RADIUS: 5,
        BORDER_WIDTH: 2,
        PADDING: 5,
        MARGINS: 10,
        
    }

class CreateLogoScreen extends Component {
    constructor(props) {
        super(props);

        this.state= {
            logoT: defaultValues.TEXT,
            logoC: defaultValues.COLOR,
            logoFs: defaultValues.FONT_SIZE,
            logoBgc: defaultValues.BACKGROUND_COLOR,
            logoBc: defaultValues.BORDER_COlOR,
            logoBr: defaultValues.BORDER_RADIUS,
            logoBw: defaultValues.BORDER_WIDTH,
            logoP: defaultValues.PADDING,
            logoM: defaultValues.MARGINS
        }
    }

    handleTextChange = (event) => {
        this.setState({ logoT: event.target.value}, this.completeUserEditing);
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ logoC: event.target.value }, this.completeUserEditing);
    }

    handleFontSizeChange = (event) => {
        console.log("handleFontSizeChange to " + event.target.value);
        this.setState({ logoFs: event.target.value }, this.completeUserEditing);
    }

    //new stuff
    handleBackgroundColorChange = (event) => {
        console.log("handleBackgroundColorChange to " + event.target.value);
        this.setState({logoBgc: event.target.value}, this.completeUserEditing);
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChange to " + event.target.value);
        this.setState({logoBc: event.target.value}, this.completeUserEditing);
    }

    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadiusChange to " + event.target.value);
        this.setState({logoBr: event.target.value}, this.completeUserEditing);
    }

    handleBorderWidthChange = (event) => {
        console.log("handleBorderWidthkChange to " + event.target.value);
        this.setState({logoBw: event.target.value}, this.completeUserEditing);
    }

    handlePaddingChange = (event) => {
        console.log("handlePaddingChange to " + event.target.value);
        this.setState({logoP: event.target.value}, this.completeUserEditing);
    }

    handleMarginChange = (event) => {
        console.log("handleMarginChange to " + event.target.value);
        this.setState({logoM: event.target.value}, this.completeUserEditing);
    }

    completeUserEditing = () => {

    }
    
    checkFields = () => {
        if(this.state.logoT ==="")
            this.setState({logoT: defaultValues.TEXT});

        if(this.state.logoC ==="#000000")
            this.setState({logoC: defaultValues.COLOR});

        if(this.state.logoFs ==="")
            this.setState({logoFc: defaultValues.FONT_SIZE});

        if(this.state.logoBgc ==="FFFFFF")
            this.setState({logoBgc:this.setStatedefaultValues.BACKGROUND_COLOR});

        if(this.state.logoBc==="#000000")
            this.setState({logoBc: defaultValues.BORDER_COlOR});

        if(this.state.logoBr==="")
            this.setState({logoBr: defaultValues.BORDER_RADIUS});

        if(this.state.logoBw==="")
            this.setState({logoBw: defaultValues.BORDER_WIDTH});

        if(this.state.logoP==="")
            this.setState({logoP: defaultValues.PADDING});

        if(this.state.logoM==="")
            this.setState({logoM: defaultValues.MARGINS});
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margins;
        const styles = {
            container: {
                color: this.state.logoC,
                fontSize: this.state.logoFs + "pt",
                backgroundColor: this.state.logoBgc,
                borderColor: this.state.logoBc,
                borderRadius: this.state.logoBr + "px",
                borderWidth: this.state.logoBw + "px",
                borderStyle: "solid",
                padding: this.state.logoP + "px",
                margin: this.state.logoM + "px",
                position: "absolute",
                display: "inline-block"            
            }
        }
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={(data) => {console.log(data);this.props.history.push('/')}}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default" >
                            <div className="panel-heading">
                                <h4><Link to="/"><button>Home</button></Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body col s4" style={{display:"inline-block",maxWidth: "40%"}}>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    this.checkFields();
                                    //addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margins: parseInt(margins.value) } });
                                    addLogo({ variables: { text: this.state.logoT, color: this.state.logoC, fontSize: this.state.logoFs, backgroundColor: this.state.logoBgc, borderColor: this.state.logoBc, borderRadius: this.state.logoBr, borderWidth: this.state.logoBw, padding: this.state.logoP, margins: this.state.logoM } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    padding.value = "";
                                    margins.value = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" onChange={this.handleTextChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" onChange={this.handleTextColorChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" onChange={this.handleFontSizeChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" defaultValue="#FFFFFF" onChange={this.handleBackgroundColorChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node =>{
                                            borderColor = node;
                                        }} placeholder="Border Color" onChange={this.handleBorderColorChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" min="2" max="50" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder = "Border Radius" onChange={this.handleBorderRadiusChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" min="2" max="50" className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder = "Border Width" onChange={this.handleBorderWidthChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" min="2" max="50" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder = "Padding" onChange={this.handlePaddingChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margins">Margins:</label>
                                        <input type="number" min="2" max="50" className="form-control" name="margins" ref={node => {
                                            margins = node;
                                        }} placeholder = "Margins" onChange={this.handleMarginChange} />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                                
                            </div>
                            <div style={ styles.container }>
                                    {this.state.logoT}
                                </div>
                        </div>
                                
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;