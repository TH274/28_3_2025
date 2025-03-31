import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Roboto Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
    background-color: #f8f8f8;
  }
  
  div {
    position: relative;
    transition: all 0.3s ease;
  }
  
  div.container-fluid {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  
  div.content-section {
    padding: 30px 0;
    margin-bottom: 30px;
  }
  
  div.content-box {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  div.flex-row {
    display: flex;
    flex-direction: row;
  }
  
  div.flex-column {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }
  
  div.flex-wrap {
    flex-wrap: wrap;
  }
  
  /* Grid layouts */
  div.grid-container {
    display: grid;
    gap: 10px;
  }
  
  /* Media container for img */
  div.media-container {
    overflow: hidden;
    margin-bottom: 15px;
  }
  
  div.media-container img {
    width: 100%;
    transition: transform 0.3s ease;
  }
  
  div.media-container:hover img {
    transform: scale(1.05);
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 600;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
  }
  
  .sztos-font {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 400;
    letter-spacing: -0.03em;
    text-transform: uppercase;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    cursor: pointer;
    font-family: 'Roboto Condensed', sans-serif;
  }
  
  ul, ol {
    list-style: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  input, select, textarea {
    font-family: 'Roboto Condensed', sans-serif;
  }
  
  .container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 15px;
  }
  
  .btn-outline {
    background-color: transparent;
    border: 1px solid #000;
    color: #000;
    
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
  
  .btn-block {
    display: block;
    width: 100%;
  }
  
  .card {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .section-title {
    font-size: 26px;
    font-weight: 700;
    text-transform: uppercase;
  }
  
  .form-control {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 16px;
    margin-bottom: 15px;
    
    &:focus {
      outline: none;
      border-color: #000;
    }
  }
  
  .alert {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 3px;
    
    &.alert-success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    
    &.alert-danger {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    
    &.alert-warning {
      background-color: #fff3cd;
      color: #856404;
      border: 1px solid #ffeeba;
    }
  }
  
  .flex {
    display: flex;
  }
  
  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    
    .page-item {
      margin: 0 5px;
      
      .page-link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 3px;
        background-color: #fff;
        border: 1px solid #ddd;
        color: #333;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: #f8f8f8;
          border-color: #000;
        }
        
        &.active {
          background-color: #000;
          color: #fff;
          border-color: #000;
        }
        
        &.disabled {
          color: #ccc;
          cursor: not-allowed;
          
          &:hover {
            background-color: #fff;
            border-color: #ddd;
          }
        }
      }
    }
  }
  
  .app-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
    font-size: 18px;
    font-weight: 500;
    color: #333;
    z-index: 9999;
  }
`;

export default GlobalStyles; 