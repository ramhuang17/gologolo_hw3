import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margins
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margins: Int!,
        ) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margins: $margins,
                ) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logoT: null,
            logoC: null,
            logoFs: null,
            logoBgc: null,
            logoBc: null,
            logoBr: null,
            logoBw: null,
            logoP: null,
            logoM: null
        }
    }

    handleTextChange = (event) => {
        console.log("handleTextChange");
        let check = event.target.value;
        if(check.trim()===""){
            return ;
        }
        else{
            this.setState({text: event.target.value});
        }
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ logoC: event.target.value }, this.completeUserEditing);
    }

    handleFontSizeChange = (event) => {
        console.log("handleFontSizeChange to " + event.target.value);
        if(this.state.logoFs!=="")
            this.setState({ logoFs: event.target.value }, this.completeUserEditing);
        return ;
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
        if(this.state.logoBr!=="")
            this.setState({logoBr: event.target.value}, this.completeUserEditing);
        return ;
    }

    handleBorderWidthChange = (event) => {
        console.log("handleBorderWidthkChange to " + event.target.value);
        if(this.state.logoBw!=="")    
            this.setState({logoBw: event.target.value}, this.completeUserEditing);
        return ;
    }

    handlePaddingChange = (event) => {
        console.log("handlePaddingChange to " + event.target.value);
        if(this.state.logoP!=="")
            this.setState({logoP: event.target.value}, this.completeUserEditing);
        return ;
    }

    handleMarginChange = (event) => {
        console.log("handleMarginChange to " + event.target.value);
        if(this.state.logoM!=="")
            this.setState({logoM: event.target.value}, this.completeUserEditing);
        return ;
    }

    completeUserEditing = () => {

    }
    
    /*checkFields = () => {
        if(this.state.logoT ==="")
            this.setState({logoT: defaultValues.TEXT});

        if(this.state.logoC ==="black")
            this.setState({logoC: defaultValues.COLOR});

        if(this.state.logoBgc ==="FFFFFF")
            this.setState({logoBgc:this.setStatedefaultValues.BACKGROUND_COLOR});

        if(this.state.logoBc==="black")
            this.setState({logoBc: defaultValues.BORDER_COlOR});

        if(this.state.logoBr==="")
            this.setState({logoBr: defaultValues.BORDER_RADIUS});

        if(this.state.logoBw==="")
            this.setState({logoBw: defaultValues.BORDER_WIDTH});

        if(this.state.logoP==="")
            this.setState({logoP: defaultValues.PADDING});

        if(this.state.logoM==="")
            this.setState({logoM: defaultValues.MARGINS});
    }*/

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
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.logoT === null)
                            this.setState({logoT: data.logo.text,
                                logoC: data.logo.color,
                                logoFs: data.logo.fontSize,
                                logoBgc: data.logo.backgroundColor,
                                logoBc: data.logo.borderColor,
                                logoBr: data.logo.borderRadius,
                                logoBw: data.logo.borderWidth,
                                logoP: data.logo.padding,
                                logoM: data.logo.margins});
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={(data) => {console.log(data);this.props.history.push(`/`)}}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/"><button>Home</button></Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body col s4" style={{display: "inline-block", maxWidth: "40%"}}>                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                //updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margins: parseInt(margins.value) } });
                                                updateLogo({ variables: { id: data.logo._id, text: this.state.logoT, color: this.state.logoC, fontSize: this.state.logoFs, backgroundColor: this.state.logoBgc, borderColor: this.state.logoBc, borderRadius: this.state.logoBr, borderWidth: this.state.logoBw, padding: this.state.logoP, margins: this.state.logoM } });
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
                                                    }} placeholder="Text" defaultValue={data.logo.text} onChange={this.handleTextChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} onChange={this.handleTextColorChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" min="2" max="144" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} onChange={this.handleFontSizeChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} onChange={this.handleBackgroundColorChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color" defaultValue={data.logo.borderColor} onChange={this.handleBorderColorChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" min="2" max="50" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} onChange={this.handleBorderRadiusChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width</label>
                                                    <input type="number" min="2" max="50" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} onChange={this.handleBorderWidthChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" min="2" max="50" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} onChange={this.handlePaddingChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margins">Margins:</label>
                                                    <input type="number" min="2" max="50" className="form-control" name="margins" ref={node => {
                                                        margins = node;
                                                    }} placeholder="Margins" defaultValue={data.logo.margins} onChange={this.handleMarginChange} />
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;