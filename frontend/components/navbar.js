import React, { useContext, useEffect, useState } from "react";
import Web3Context from "../contexts/Web3Context";
import ThreeNFT from "./threeNFT";
import useWindowDimensions from "../utils/getWindowDim";
import metadata from "../metadata_uri.json";
import DonateModal from "./donateModal";

const SvgAnimation = () => {
  return (
    <svg
      width="284"
      height="120"
      viewBox="0 0 284 130"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        id="Path"
        className="svg-bag"
        fill="#7ed957"
        stroke="#fff"
        d="M 91.375 87.015625 L 82.364594 31.041687 C 81.15625 23.526062 75.25 18.067719 68.328125 18.067719 L 62.515625 18.067719 L 62.515625 16.708344 C 62.515625 7.776062 55.1875 0.510437 46.177078 0.510437 C 37.171875 0.510437 29.84375 7.776062 29.84375 16.708344 L 29.84375 18.067719 L 24.03125 18.067719 C 17.104172 18.067719 11.203125 23.526062 9.989578 31.041687 L 0.979172 87.015625 C 0.177078 91.994812 1.526047 96.953125 4.682297 100.619797 C 7.395828 103.770844 11.067703 105.510422 15.015625 105.510422 L 26.229172 105.510422 C 31.583328 105.510422 36.510422 103.640625 40.375 100.526047 C 45.005203 96.791687 48.114578 91.270844 48.619797 85.036469 L 48.692703 85.036469 L 48.692703 83.291687 C 48.692703 83.276062 48.692703 83.255219 48.692703 83.234375 L 48.692703 77.098969 L 51.984375 77.098969 C 63.369781 77.098969 72.635406 67.911469 72.635406 56.619812 L 72.635406 48.369812 L 64.3125 48.369812 C 54.578125 48.369812 46.401047 55.083344 44.229172 64.088562 C 40.442703 59.354187 34.59375 56.3125 28.041672 56.3125 L 19.723953 56.3125 L 19.723953 64.5625 C 19.723953 75.848969 28.984375 85.036469 40.369797 85.036469 L 43.572922 85.036469 C 42.661453 93.729187 35.229172 100.526047 26.229172 100.526047 L 15.015625 100.526047 C 12.5625 100.526047 10.25 99.40625 8.505203 97.385437 C 6.338547 94.869812 5.385422 91.286469 5.947922 87.802094 L 14.958328 31.828125 C 15.776047 26.744812 19.59375 23.052094 24.03125 23.052094 L 68.328125 23.052094 C 72.765625 23.052094 76.583344 26.744812 77.401031 31.828125 L 86.411469 87.802094 C 86.973969 91.286469 86.015625 94.869812 83.848969 97.385437 C 82.109375 99.40625 79.796875 100.526047 77.338531 100.526047 L 45.088547 100.526047 C 43.239578 102.5 41.083328 104.1875 38.692703 105.510422 L 77.338531 105.510422 C 81.291656 105.510422 84.963531 103.770844 87.677094 100.619797 C 90.828125 96.953125 92.177094 91.994812 91.375 87.015625 Z M 64.3125 53.359375 L 67.604156 53.359375 L 67.604156 56.619812 C 67.604156 65.161469 60.598969 72.109375 51.984375 72.109375 L 48.692703 72.109375 L 48.692703 68.848969 C 48.692703 60.307312 55.697922 53.359375 64.3125 53.359375 Z M 24.75 64.5625 L 24.75 61.296875 L 28.041672 61.296875 C 36.65625 61.296875 43.661453 68.244812 43.661453 76.786469 L 43.661453 80.052094 L 40.369797 80.052094 C 31.760422 80.052094 24.75 73.098969 24.75 64.5625 Z M 34.869797 16.708344 C 34.869797 10.526062 39.942703 5.494812 46.177078 5.494812 C 52.411453 5.494812 57.484375 10.526062 57.484375 16.708344 L 57.484375 18.067719 L 34.869797 18.067719 Z"
      />
      <g id="Tag" className="svg-tag">
        <path
          id="path1"
          fill="#e59b65"
          stroke="none"
          d="M 247.409164 78.765625 L 268.549774 97.114594 C 269.226868 97.697922 269.304993 98.71875 268.732086 99.40625 L 253.346664 117.854172 C 252.768539 118.546875 251.732086 118.640625 251.034164 118.0625 L 229.122711 99.786469 L 229.164368 83.432297 C 229.164368 82.640625 229.732086 81.963547 230.513336 81.822922 Z"
        />
        <path
          id="path2"
          fill="#fed883"
          stroke="none"
          d="M 247.409164 78.765625 L 268.549774 97.114594 C 269.226868 97.697922 269.304993 98.71875 268.732086 99.40625 L 254.831039 116.072922 C 254.252914 116.765625 253.216461 116.859375 252.523743 116.28125 L 232.091461 99.239594 C 231.716461 98.927094 231.502914 98.463547 231.502914 97.973969 L 231.539368 82.447922 C 231.544586 81.630219 232.143539 80.942719 232.950836 80.828125 Z"
        />
        <path
          id="path3"
          fill="#87d1ee"
          stroke="none"
          d="M 237.101868 97.828125 C 237.596664 103.244797 242.383118 107.239594 247.799789 106.75 C 253.216461 106.255219 257.211243 101.46875 256.721649 96.052094 C 256.232086 90.635422 251.440414 86.640625 246.023743 87.130219 C 240.607086 87.619797 236.612289 92.411469 237.101868 97.828125 Z"
        />
        <path
          id="path4"
          fill="#9ed44a"
          stroke="none"
          d="M 249.591461 90.104172 C 249.502914 89.125 250.794586 88.213547 251.450836 87.875 C 252.028961 88.234375 253.476868 89.34375 254.607086 90.885422 C 256.862274 93.979172 257.127899 96.015625 256.570618 98.947922 C 256.138336 101.229172 253.867493 104 252.591461 105.078125 C 251.674789 104.0625 249.732086 101.713547 249.289368 100.432297 C 248.732086 98.833344 249.065414 97.979172 250.294586 97.869797 C 251.518539 97.760422 250.627914 97.015625 250.924789 95.755219 C 251.221664 94.489594 252.893539 94.75 252.820618 93.932297 C 252.747711 93.114594 249.700836 91.333344 249.591461 90.104172 Z"
        />
        <path
          id="path5"
          fill="#9ed44a"
          stroke="none"
          d="M 244.091461 93.072922 C 244.034164 92.421875 240.919586 91.4375 239.372711 91.03125 C 238.768539 91.90625 237.445618 94.333344 237.028961 97.010422 C 236.612289 99.682297 238.935211 102.880219 240.148743 104.145844 C 240.419586 102.609375 241.028961 99.286469 241.263336 98.276047 C 241.565414 97.010422 243.607086 96.828125 243.976868 96.380219 C 244.351868 95.9375 244.164368 93.890625 244.091461 93.072922 Z"
        />
        <path
          id="path6"
          fill="#ffffff"
          fillRule="evenodd"
          stroke="none"
          d="M 261.075836 95.078125 C 260.784149 95.421875 260.831024 95.942719 261.179993 96.229172 L 263.851868 98.463547 C 264.200836 98.75 264.716461 98.703125 265.008118 98.359375 C 265.299774 98.010422 265.252899 97.489594 264.903961 97.203125 L 262.232086 94.96875 C 261.883118 94.682297 261.362274 94.729172 261.075836 95.078125 Z"
        />
        <path
          id="path7"
          fill="#000000"
          fillRule="evenodd"
          stroke="none"
          d="M 229.372711 73.854172 C 227.497711 73.822922 225.674789 74.432297 224.190414 75.572922 C 222.706039 76.71875 221.653961 78.328125 221.206039 80.145844 C 220.758118 81.963547 220.940414 83.880219 221.721664 85.583344 C 222.502914 87.286469 223.836243 88.671875 225.508118 89.515625 C 226.476868 90.005219 227.523743 90.296875 228.591461 90.385422 L 228.534164 99.510422 C 228.528961 100.255219 228.857086 100.958344 229.429993 101.432297 L 250.445618 118.963547 C 251.497711 119.84375 253.065414 119.697922 253.945618 118.645844 L 269.601868 99.875 C 270.471649 98.833344 270.341461 97.28125 269.310211 96.395844 L 248.528961 78.572922 C 247.956039 78.078125 247.195618 77.875 246.450836 78.015625 L 237.179993 79.765625 C 236.711243 78.192719 235.778961 76.78125 234.497711 75.734375 C 233.049789 74.541672 231.242493 73.880219 229.372711 73.854172 Z M 230.581039 88.614594 C 230.476868 88.640625 230.367493 88.65625 230.258118 88.677094 L 230.289368 83.4375 C 230.294586 83.041672 230.575836 82.697922 230.966461 82.625 L 246.758118 79.645844 C 247.008118 79.598969 247.263336 79.666672 247.450836 79.828125 L 268.232086 97.65625 C 268.575836 97.947922 268.617493 98.463547 268.331024 98.8125 L 252.669586 117.588547 C 252.377914 117.9375 251.857086 117.984375 251.508118 117.692719 L 230.487289 100.161469 C 230.299789 100.005219 230.190414 99.770844 230.190414 99.520844 L 230.247711 90.348969 C 230.471664 90.322922 230.695618 90.286469 230.919586 90.239594 C 232.752914 89.859375 234.403961 88.869797 235.601868 87.432297 C 235.893539 87.083344 235.846664 86.5625 235.497711 86.265625 C 235.143539 85.973969 234.622711 86.020844 234.331039 86.375 C 233.372711 87.520844 232.049789 88.3125 230.581039 88.614594 Z M 226.252914 88.041672 C 226.992493 88.411469 227.789368 88.640625 228.601868 88.723969 L 228.638336 83.427094 C 228.643539 82.234375 229.492493 81.21875 230.659164 81 L 235.539368 80.078125 C 235.153961 78.880219 234.429993 77.817719 233.445618 77.010422 C 232.289368 76.0625 230.846664 75.53125 229.346664 75.510422 C 227.846664 75.484375 226.388336 75.96875 225.200836 76.885422 C 224.013336 77.796875 223.174789 79.088547 222.815414 80.541672 C 222.456039 82 222.601868 83.53125 223.226868 84.890625 C 223.851868 86.255219 224.919586 87.364594 226.252914 88.041672 Z M 256.299774 96.307297 C 256.018524 93.234375 254.247711 90.661469 251.763336 89.229172 L 251.195618 89.6875 C 250.789368 90.015625 250.784164 90.630219 251.185211 90.96875 L 253.638336 93.010422 C 254.716461 93.911469 254.169586 95.671875 252.768539 95.796875 C 252.398743 95.828125 252.127914 96.15625 252.159164 96.526047 L 252.216461 97.161469 C 252.299789 98.036469 251.653961 98.807297 250.784164 98.885422 C 250.263336 98.932297 249.982086 99.520844 250.273743 99.953125 L 251.732086 102.135422 L 253.096664 104.09375 C 255.289368 102.239594 256.575836 99.385422 256.299774 96.307297 Z M 250.122711 92.239594 C 248.950836 91.260422 248.935211 89.473969 250.065414 88.473969 C 248.924789 88.098969 247.685211 87.942719 246.409164 88.057297 C 244.143539 88.265625 242.143539 89.28125 240.679993 90.796875 L 243.539368 91.697922 C 244.497711 92 245.174789 92.84375 245.268539 93.84375 L 245.372711 95.020844 C 245.461243 95.958344 245.008118 96.864594 244.206039 97.359375 L 242.575836 98.364594 C 242.372711 98.494797 242.232086 98.703125 242.195618 98.942719 L 241.388336 104.114594 C 243.179993 105.614594 245.539368 106.427094 248.049789 106.197922 C 249.393539 106.078125 250.643539 105.666672 251.742493 105.041672 L 250.362289 103.067719 L 248.893539 100.875 C 247.919586 99.416672 248.836243 97.447922 250.565414 97.244797 L 250.513336 96.677094 C 250.398743 95.453125 251.252914 94.369797 252.440414 94.171875 Z M 239.945618 102.604172 C 238.961243 101.291672 238.315414 99.703125 238.159164 97.947922 C 237.966461 95.84375 238.508118 93.838547 239.575836 92.1875 L 243.044586 93.276047 C 243.362289 93.375 243.586243 93.65625 243.617493 93.989594 L 243.726868 95.171875 C 243.752914 95.484375 243.601868 95.786469 243.336243 95.947922 L 241.706039 96.958344 C 241.086243 97.338547 240.669586 97.973969 240.560211 98.6875 Z M 246.258118 86.411469 C 252.179993 85.875 257.409149 90.239594 257.945618 96.161469 C 258.482086 102.078125 254.117493 107.3125 248.195618 107.848969 C 242.278961 108.385422 237.044586 104.020844 236.508118 98.098969 C 235.971664 92.177094 240.336243 86.947922 246.258118 86.411469 Z"
        />
      </g>
      <g id="Text">
        <path
          id="path8"
          fill="#ffffff"
          stroke="none"
          d="M 117.243591 31.166534 L 98.95192 31.166534 L 98.95192 77.827988 L 117.243591 77.827988 L 117.243591 75.801956 L 100.977966 75.801956 L 100.977966 58.150909 L 113.191498 58.150909 L 113.191498 56.124863 L 100.977966 56.124863 L 100.977966 33.192581 L 117.243591 33.192581 Z"
        />
        <path
          id="path9"
          fill="#ffffff"
          stroke="none"
          d="M 130.414917 78.468613 L 130.789917 78.468613 C 132.38887 78.468613 133.883667 78.093613 135.321167 77.239456 C 136.706589 76.442581 137.82637 75.322784 138.680542 73.937363 C 139.48262 72.656113 139.909714 71.109238 139.909714 69.400909 L 139.909714 68.817581 L 137.883667 68.817581 L 137.883667 69.400909 C 137.883667 70.682159 137.560745 71.854034 136.92012 72.921738 C 136.279495 73.989456 135.373245 74.843613 134.310745 75.479034 C 133.243042 76.119659 132.071167 76.442581 130.789917 76.442581 L 130.414917 76.442581 C 129.081573 76.442581 127.909714 76.119659 126.841995 75.479034 C 125.722214 74.947784 124.868042 74.093613 124.227417 72.921738 C 123.591995 71.854034 123.269089 70.682159 123.269089 69.400909 L 123.269089 39.697784 C 123.269089 38.468613 123.591995 37.296738 124.227417 36.124863 C 124.868042 35.057159 125.722214 34.202988 126.841995 33.562363 C 127.909714 32.979034 129.133667 32.656113 130.414917 32.656113 L 130.789917 32.656113 C 132.071167 32.656113 133.243042 32.979034 134.310745 33.619659 C 135.373245 34.255081 136.279495 35.109238 136.92012 36.176956 C 137.560745 37.244659 137.883667 38.416534 137.883667 39.697784 L 137.883667 40.281113 L 139.909714 40.281113 L 139.909714 39.697784 C 139.909714 38.098831 139.48262 36.604034 138.680542 35.166534 C 137.82637 33.775909 136.706589 32.656113 135.321167 31.859238 C 133.883667 31.057159 132.38887 30.630081 130.789917 30.630081 L 130.414917 30.630081 C 128.76387 30.630081 127.216995 31.057159 125.774292 31.859238 C 124.38887 32.713409 123.269089 33.775909 122.472214 35.166534 C 121.618042 36.604034 121.243042 38.098831 121.243042 39.697784 L 121.243042 69.400909 C 121.243042 71.109238 121.618042 72.656113 122.472214 73.937363 C 123.321167 75.322784 124.38887 76.390488 125.774292 77.239456 C 127.216995 78.093613 128.76387 78.468613 130.414917 78.468613 Z"
        />
        <path
          id="path10"
          fill="#ffffff"
          stroke="none"
          d="M 153.558487 78.468613 L 153.98558 78.468613 C 155.79808 78.468613 157.402237 78.093613 158.839737 77.239456 C 160.225159 76.494659 161.402237 75.374863 162.36058 73.937363 C 163.214737 72.656113 163.64183 71.109238 163.64183 69.296738 L 163.64183 39.801956 C 163.64183 38.150909 163.214737 36.604034 162.36058 35.218613 C 161.506409 33.885284 160.334534 32.765488 158.839737 31.859238 C 157.45433 31.057159 155.79808 30.630081 153.98558 30.630081 L 153.558487 30.630081 C 151.79808 30.630081 150.199112 31.057159 148.761612 31.859238 C 147.26683 32.713409 146.094955 33.833206 145.240784 35.218613 C 144.334534 36.708206 143.907455 38.202988 143.907455 39.801956 L 143.907455 69.296738 C 143.907455 71.057159 144.334534 72.604034 145.240784 73.937363 C 146.199112 75.426956 147.376205 76.494659 148.761612 77.239456 C 150.251205 78.093613 151.855362 78.468613 153.558487 78.468613 Z M 153.98558 76.442581 L 153.558487 76.442581 C 152.17308 76.442581 150.89183 76.119659 149.719955 75.479034 C 148.54808 74.843613 147.589737 73.989456 146.949112 72.869659 C 146.256409 71.749863 145.933487 70.572784 145.933487 69.296738 L 145.933487 39.801956 C 145.933487 38.630081 146.256409 37.406113 146.949112 36.229034 C 147.532455 35.166534 148.438705 34.312363 149.719955 33.619659 C 150.89183 32.979034 152.17308 32.656113 153.558487 32.656113 L 153.98558 32.656113 C 155.370987 32.656113 156.652237 32.979034 157.824112 33.619659 C 159.001205 34.255081 159.959534 35.166534 160.600159 36.229034 C 161.240784 37.348831 161.61058 38.525909 161.61058 39.801956 L 161.61058 69.296738 C 161.61058 70.682159 161.240784 71.854034 160.600159 72.869659 C 159.855377 74.041534 158.89183 74.895706 157.824112 75.479034 C 156.652237 76.119659 155.370987 76.442581 153.98558 76.442581 Z"
        />
        <path
          id="path11"
          fill="#ffffff"
          stroke="none"
          d="M 177.450928 78.359238 L 177.825928 78.359238 C 179.529053 78.359238 181.133209 77.932159 182.622803 77.083206 C 185.930084 75.213409 187.638428 72.229034 187.638428 68.067581 C 187.638428 66.572784 187.372803 65.031113 186.888428 63.536331 C 186.195709 61.562363 185.133209 59.588409 183.638428 57.671738 C 182.253006 55.963409 180.435303 54.364456 178.195709 52.921738 C 174.893631 50.895706 172.596756 48.708206 171.424881 46.468613 C 170.253006 44.281113 169.664459 42.364456 169.664459 40.708206 C 169.664459 38.895706 170.039459 37.406113 170.836334 36.176956 C 171.476959 35.166534 172.383209 34.255081 173.664459 33.510284 C 174.732178 32.869659 175.956131 32.551956 177.450928 32.551956 L 177.825928 32.551956 C 179.101959 32.551956 180.279053 32.869659 181.398834 33.510284 C 182.466553 34.150909 183.372803 35.057159 184.008209 36.124863 C 184.648834 37.296738 184.971756 38.468613 184.971756 39.697784 L 184.971756 40.281113 L 186.997803 40.281113 L 186.997803 39.697784 C 186.997803 38.098831 186.570709 36.551956 185.768631 35.057159 C 184.919678 33.671738 183.851959 32.604034 182.466553 31.749863 C 180.971756 30.952988 179.424881 30.525909 177.825928 30.525909 L 177.450928 30.525909 C 175.799881 30.525909 174.195709 30.952988 172.706131 31.749863 C 171.211334 32.551956 170.039459 33.671738 169.075928 35.109238 C 168.117584 36.604034 167.638428 38.525909 167.638428 40.765488 C 167.638428 42.791534 168.279053 45.031113 169.612381 47.484238 C 170.893631 49.989456 173.398834 52.390488 177.075928 54.630081 C 180.435303 56.760284 182.732178 59.005081 183.904053 61.458206 C 185.023834 63.854034 185.612381 66.093613 185.612381 68.176956 C 185.612381 71.484238 184.279053 73.880081 181.612381 75.322784 C 180.331131 76.015488 179.101959 76.333206 177.825928 76.333206 L 177.450928 76.333206 C 176.169678 76.333206 174.945709 76.015488 173.878006 75.374863 C 172.758209 74.734238 171.904053 73.880081 171.263428 72.760284 C 170.622803 71.692581 170.305084 70.468613 170.305084 69.187363 L 170.305084 68.656113 L 168.279053 68.656113 L 168.279053 69.187363 C 168.279053 70.843613 168.654053 72.390488 169.503006 73.775909 C 170.305084 75.213409 171.424881 76.333206 172.862381 77.135284 C 174.253006 77.989456 175.799881 78.359238 177.450928 78.359238 Z"
        />
        <path
          id="path12"
          fill="#ffffff"
          stroke="none"
          d="M 191.636047 33.192581 L 201.234985 33.192581 L 201.234985 77.827988 L 203.261047 77.827988 L 203.261047 33.192581 L 212.859985 33.192581 L 212.859985 31.166534 L 191.636047 31.166534 Z"
        />
        <path
          id="path13"
          fill="#ffffff"
          stroke="none"
          d="M 226.511261 78.468613 L 226.938324 78.468613 C 228.750824 78.468613 230.355011 78.093613 231.792511 77.239456 C 233.177917 76.494659 234.355011 75.374863 235.313324 73.937363 C 236.167511 72.656113 236.594574 71.109238 236.594574 69.296738 L 236.594574 39.801956 C 236.594574 38.150909 236.167511 36.604034 235.313324 35.218613 C 234.459167 33.885284 233.287292 32.765488 231.792511 31.859238 C 230.407074 31.057159 228.750824 30.630081 226.938324 30.630081 L 226.511261 30.630081 C 224.750824 30.630081 223.151886 31.057159 221.714386 31.859238 C 220.219574 32.713409 219.047699 33.833206 218.193542 35.218613 C 217.287292 36.708206 216.860199 38.202988 216.860199 39.801956 L 216.860199 69.296738 C 216.860199 71.057159 217.287292 72.604034 218.193542 73.937363 C 219.151886 75.426956 220.328949 76.494659 221.714386 77.239456 C 223.203949 78.093613 224.808136 78.468613 226.511261 78.468613 Z M 226.938324 76.442581 L 226.511261 76.442581 C 225.125824 76.442581 223.844574 76.119659 222.672699 75.479034 C 221.500824 74.843613 220.542511 73.989456 219.901886 72.869659 C 219.209167 71.749863 218.886261 70.572784 218.886261 69.296738 L 218.886261 39.801956 C 218.886261 38.630081 219.209167 37.406113 219.901886 36.229034 C 220.485199 35.166534 221.391449 34.312363 222.672699 33.619659 C 223.844574 32.979034 225.125824 32.656113 226.511261 32.656113 L 226.938324 32.656113 C 228.323761 32.656113 229.605011 32.979034 230.776886 33.619659 C 231.953949 34.255081 232.912292 35.166534 233.552917 36.229034 C 234.193542 37.348831 234.563324 38.525909 234.563324 39.801956 L 234.563324 69.296738 C 234.563324 70.682159 234.193542 71.854034 233.552917 72.869659 C 232.808136 74.041534 231.844574 74.895706 230.776886 75.479034 C 229.605011 76.119659 228.323761 76.442581 226.938324 76.442581 Z"
        />
        <path
          id="path14"
          fill="#ffffff"
          stroke="none"
          d="M 251.309937 31.166534 L 240.591187 31.166534 L 240.591187 77.827988 L 242.617218 77.827988 L 242.617218 54.843613 L 246.83075 54.843613 L 258.45575 77.827988 L 260.747437 77.827988 L 249.070343 54.843613 L 251.309937 54.843613 C 252.908875 54.843613 254.45575 54.364456 255.950562 53.296738 C 257.335968 52.229034 258.403687 50.843613 259.257843 49.031113 C 260.054718 47.218613 260.481812 45.244659 260.481812 43.161331 L 260.481812 42.630081 C 260.481812 40.604034 260.054718 38.630081 259.257843 36.817581 C 258.403687 35.109238 257.335968 33.775909 255.950562 32.713409 C 254.45575 31.697784 252.908875 31.166534 251.309937 31.166534 Z M 251.309937 52.817581 L 242.617218 52.817581 L 242.617218 33.192581 L 251.309937 33.192581 C 252.591187 33.192581 253.815125 33.619659 254.934937 34.468613 C 255.950562 35.270706 256.804718 36.390488 257.497437 37.885284 C 258.138062 39.374863 258.45575 40.921738 258.45575 42.630081 L 258.45575 43.161331 C 258.45575 44.921738 258.138062 46.520706 257.497437 48.015488 C 256.856812 49.510284 255.950562 50.682159 254.882843 51.536331 C 253.710968 52.390488 252.539093 52.817581 251.309937 52.817581 Z"
        />
        <path
          id="path15"
          fill="#ffffff"
          stroke="none"
          d="M 283.040436 31.166534 L 264.748779 31.166534 L 264.748779 77.827988 L 283.040436 77.827988 L 283.040436 75.801956 L 266.774811 75.801956 L 266.774811 58.150909 L 278.988373 58.150909 L 278.988373 56.124863 L 266.774811 56.124863 L 266.774811 33.192581 L 283.040436 33.192581 Z"
        />
      </g>
    </svg>
  );
};

export const NFTProgress = ({ level, money, upgrade, upgradeFunc }) => {
  if (!level) {
    level = 1;
  }
  if (!money) {
    money = 0;
  }
  const levelToRange = {
    1: [0, 10],
    2: [10, 20],
    3: [20, 50],
    4: [50, 100],
    5: [100],
  };

  const percent =
    (money - levelToRange[level][0]) /
    (levelToRange[level][1] - levelToRange[level][0]);
  return (
    <div className="nft-progress">
      <div className="nft-level-name">
        <div className="nft-level-title">Your CRB Level</div>
        <div className="nft-actual-level">{level}</div>
      </div>
      <div className="nft-progress-level">
        <div className="nft-progress-level-text">{levelToRange[level][0]}</div>
        <div className="nft-progress-bar">
          <div
            className="nav-inner-prog"
            style={{ width: `${percent * 100}%` }}
          ></div>
        </div>
        <div className="nft-progress-level-text">{levelToRange[level][1]}</div>
      </div>
      <div className="nft-prog-description">
        {upgrade ? (
          <button type="button" onClick={() => upgradeFunc()}>
            Upgrade
          </button>
        ) : (
          <>Level Up your NFT by offsetting your carbon emissions.</>
        )}
      </div>
    </div>
  );
};
const Navbar = () => {
  const {
    walletAddress,
    connectWallet,
    mintCRB,
    getNftDetails,
    upgradeNFT,
    donate,
  } = useContext(Web3Context);

  const [minted, setMinted] = useState(null);
  const [donated, setDonated] = useState(null);
  const [level, setLevel] = useState(null);
  const [upgrade, setUpgrade] = useState(false);
  const [nextLevel, setNextLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const nftData = async () => {
      const data = await getNftDetails();

      if (data) {
        setLoading(true);
        const donation = data.donated.toNumber() * 10 ** -6;
        const nftLevel = data.level;
        setDonated(donation);
        setLevel(nftLevel);

        switch (true) {
          case 0 <= donation && donation < 10:
            if (nftLevel !== 1) {
              setUpgrade(true);
              setNextLevel(1);
            }

            break;
          case 10 <= donation && donation < 20:
            if (nftLevel !== 2) {
              setUpgrade(true);
              setNextLevel(2);
            }
            break;
          case 20 <= donation && donation < 50:
            if (nftLevel !== 3) {
              setUpgrade(true);
              setNextLevel(3);
            }
            break;
          case 50 <= donation && donation < 100:
            if (nftLevel !== 4) {
              setUpgrade(true);
              setNextLevel(4);
            }
            break;
          case 100 <= donation:
            if (nftLevel !== 5) {
              setUpgrade(true);
              setNextLevel(5);
            }
            break;
          default:
            break;
        }
        setMinted(true);
        setLoading(false);
      } else {
        setMinted(false);
      }
    };
    walletAddress && nftData();
  }, [walletAddress, upgrade, donated]);

  const openModal = () => {
    setModal((val) => !val);
  };
  const closeModal = () => {
    setModal(false);
  };

  const upgradeFunc = async () => {
    const newUri = metadata[nextLevel.toString()];
    const tx = await upgradeNFT(newUri);
    setUpgrade(false);
    setNextLevel(null);
  };
  const donateFunc = async () => {
    const newDonation = await donate(8);
    setDonated(newDonation * 10 ** -6);
  };
  var s_w = 1000;
  var img_type = <></>;
  if (typeof window !== "undefined") {
    // Client-side-only code
    const { width } = useWindowDimensions();
    s_w = width;
  }

  // useEffect(() => {
  //   minted &&
  //   const getNftDetails = async () => {
  //     const data = await getNftDetails();
  //     data && setMinted(true);
  //   };
  //   walletAddress && getNft();
  // }, []);

  return (
    <>
      <div className="nav-main">
        <div className="nav-body">
          {/* <img src={logo} alt="" /> */}
          {s_w > 600 ? (
            <SvgAnimation />
          ) : (
            <>
              <img src="/assets/ecostore_small.svg" style={{ width: 60 }} />
            </>
          )}
        </div>
        <div className="nav-right">
          <button type="button" className="navbar-btn" onClick={openModal}>
            Donate
          </button>

          {!walletAddress ? (
            <div className="nav-nft-contain">
              <button
                type="button"
                onClick={() => connectWallet()}
                className="navbar-btn"
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            <div className="nav-nft-contain">
              {!loading && minted ? (
                <>
                  <ThreeNFT type={level} />
                </>
              ) : (
                minted === false && (
                  <button
                    type="button"
                    onClick={async () => {
                      const data = await mintCRB();
                      console.log(data);
                    }}
                  >
                    MINT
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {modal && <DonateModal ocf={donateFunc} closer={closeModal} />}
    </>
  );
};

export default Navbar;
