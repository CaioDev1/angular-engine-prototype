export default () => /*css*/`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        text-align: center;

        background-color: #0093E9;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
    }

    h1, td, th {
        color: white;
    }
    
    a {
        cursor: pointer;
    }

    input, select, button {
        margin: 1% 0;
        padding: 2% 0;
    }

    main {
        width: 70%;
        min-height: 100vh;
    }
`