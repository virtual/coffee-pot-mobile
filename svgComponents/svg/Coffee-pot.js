import React from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from 'react-native';

class CoffeePot extends React.Component { 
// const CoffeePot = props => (
  // width={props.width || 21.664} height={props.height || 21.665} 
render() {
  return (
  <Svg style={styles.svgSvg} viewBox="0 0 21.664 21.665"><Path fill={this.props.fillColor} d="M2.756 20.725h2.95a.533.533 0 0 0 .523.458h6.707c.27 0 .482-.2.523-.458h2.95a.903.903 0 0 0 .903-.903H1.854c0 .499.404.903.902.903zM20.865 11.444c-.752-.609-1.811-.619-2.508-.542.02-.486.031-.983.031-1.5H0c0 4.97.752 8.556 5.511 9.894h7.366c1.885-.529 3.135-1.418 3.964-2.6 1.806-.035 4.711-.746 4.82-3.24.047-1.092-.407-1.698-.796-2.012zm-3.267 3.826c.346-.889.551-1.889.664-2.988.488-.08 1.329-.131 1.754.215.078.064.321.262.293.901-.057 1.292-1.661 1.726-2.711 1.872zM7.491 8.704s3.5-.257 1.896-3.208c-1.288-2.369-.994-3.759.654-5.015 0 0-5.398 1.375-2.25 5.63 1.155 1.854-.3 2.593-.3 2.593z"></Path>
  <Path fill={this.props.fillColor} d="M9.85 8.468s2.804-.591 1.278-2.846c-.554-.978.21-1.327.21-1.327s-1.805.057-1.043 1.608c.61 1.247.429 1.955-.445 2.565z"></Path></Svg>
  )
}
}

 
const styles = StyleSheet.create({
 
  svgSvg: {
    width: '80%',
    height: 500
  }  
});

export default CoffeePot;
