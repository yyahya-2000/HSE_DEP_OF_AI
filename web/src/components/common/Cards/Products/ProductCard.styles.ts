import { makeStyles } from 'tss-react/mui'

export const useProductCardStyle = makeStyles()((theme) => ({
    title:{
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "24px",
        textTransform: "uppercase",
        color: "#4A4646",
        marginBottom: "10px",
    },
    category:{
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "30px",
        color: "#4A4646"
    },
    line:{
        border: "1px solid #D9D9D9"
    },

}));

export default useProductCardStyle;