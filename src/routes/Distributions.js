import React, { Component } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import Chart from '../components/Chart';
import { normalize, range, sum, decamelize } from '../jsutils/index';
import * as pdfs from '../statistical-distributions/index';
import colorScale from '../utils/colorScale';
import { font } from '../theme';

const count = 20;
const xs = range(count).map(x => x + 1);
function getPdfArgs(pdf) {
  switch (pdf) {
    // case 'normal': return { count, xs, mean: count / 2, variance: 20 };
    // case 'normal': return { count, variance: Math.sqrt(2), mean: 1 };
    case 'normal': return { variance: count / 4, mean: count / 2 };
    case 'logNormal': return { count, xs, mean: count / 4, variance: count / 2 };
    case 'symmetricNormalBimodal': return { count, xs, mean: count / 8, variance: count / 4 };
    case 'symmetricNormalTrimodal': return { count, xs, mean: count / 12, variance: count / 8 };
    case 'single': return { count, xs, mean: 50, variance: 20 };
    case 'uniformRegularMultimodal': return { count: count + 1, modes: [7, 6, 3, 1] };
    default: return { count, xs, mean: count / 2, variance: count / 4 };
  }
}
const layout = {
  font: { family: font.heading, size: 16 },
  // width: 1000,
  height: 600,
  yaxis: {
    ticksuffix: '%',
    title: 'Portion of total density',
  },
  xaxis: {
    title: 'Index',
  },
};

const Title = styled.h1`margin: 3em 0 .5em 0;`;
const Container = styled.main`margin: 5vw 5vh`;
class Distributions extends Component {
  render() {
    return (
      <div className="App">
        {
            Object.keys(pdfs).map((pdf) => {
              const y = normalize(xs.map(x => pdfs[pdf](getPdfArgs(pdf))(x))).map(n => n * 100);
              const color = colorScale(y, 'log');
              return (<Container key={pdf}>
                <Title>{ decamelize(pdf) }</Title>
                <Chart
                key={pdf}
                className={pdf}
                data={[{ x:xs, y, type: 'bar', marker:{color:y.map(color)}}]}
                layout={layout} />
            </Container>);
            })}
      </div>
    );
  }
}

export default Distributions;