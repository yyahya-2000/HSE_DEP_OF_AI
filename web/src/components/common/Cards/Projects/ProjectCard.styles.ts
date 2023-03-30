import { makeStyles } from 'tss-react/mui'

export const useProjectCardStyle = makeStyles()((theme) => ({
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
    line:{
        border: "1px solid #D9D9D9"
    },
}));

export default useProjectCardStyle;