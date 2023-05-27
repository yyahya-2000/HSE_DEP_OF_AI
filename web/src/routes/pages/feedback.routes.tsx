import {routers} from "../../routers";
import {FeedbackPage} from "../../components/Feedback";

export const feedbackRoutes = {
    path: routers.feedback,
    children: [
        { path: '', element: <FeedbackPage /> },

    ]
}