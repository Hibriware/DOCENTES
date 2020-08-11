
import React, {useEffect} from 'react';
import lottie from 'lottie-web';
import animation from '../assets/animations/26280-loader.json';
import {Grid} from '@material-ui/core';

const Loader: React.FC = () => {
  let animationContainer: any = React.createRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      animationData: animation,
      autoplay: true,
    });

  }, []);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '95vh' }}
    >

      <Grid item xs={3}>
        <div ref={animationContainer}/>
      </Grid>

    </Grid>
  )
}

export default Loader;