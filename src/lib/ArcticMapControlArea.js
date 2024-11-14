import React from 'react';

class ArcticMapControlArea extends React.Component {
    static displayName = 'ArcticMapControlArea';
    constructor(props) {
        super(props)
        
    }

    componentDidUpdate() {
        
    }

    append(ele){
        this.props.children.push(ele);
    }

    render() {

        var self = this;
        var index = 0
     

        var children = React.Children.map(this.props.children, function (child) {
          
      
            // else if (child.type.name === 'ArcticMapLLDSearch') {
      
            //   return React.cloneElement(child, {
            //   })
      
            // } 
      
            
              return React.cloneElement(child, {
                am : self.props.am,
                map : self.props.am.state.map,
                view : self.props.am.state.view,
                //hostDiv : self.controlNode
                //ref: 'child-' + (index++)
                //ref: (c) => { if (c) { self.childrenElements.push(c); } return 'child-' + (index++) }
              })
          });


        return (<span className='arcticmap-area'>{children}</span>)
    }

}

export default ArcticMapControlArea;
