import { makeStyles } from 'tss-react/mui'

export const useResearchCenterStyle = makeStyles()((theme) => ({
    title:{
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "20px",
        lineHeight: "24px",
        textTransform: "uppercase",
        color: "#4A4646",
        marginBottom: "10px"
    },
    textcols:{
        overflow: "hidden"
    },
    textcolsLeft:{
        float: "left",
        width: "51%",
    },
    textcolsRight:{
        marginLeft: "53%",
    },
    text:{
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "25px",
        textTransform: "uppercase",
        color: "#4A4646"

    },
    value:{
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "25px",
        color: "#5F52FA"
    }
}));

export default useResearchCenterStyle;
