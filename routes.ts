import { Express } from "express";
import verifyJWT from "./src/middleware/verifyJWT";
import verifyPermission from "./src/middleware/verifyUserPermission";

import authRouter from "./src/routes/auth.routes";
import subjectRouter from "./src/routes/subject.routes";
import topicRouter from "./src/routes/topicUnderSubject.routes";
import questionRouter from "./src/routes/question.routes";
import submissionRouter from "./src/routes/submission.routes";
import revisionRouter from "./src/routes/revision.routes";

// all routes
function routes(app: Express): void {
  app.use("/api/v2/auth/", authRouter);

  app.use(verifyJWT);

  app.use("/api/v2/subject", subjectRouter);

  app.use("/api/v2/topic", topicRouter);

  app.use("/api/v2/question", questionRouter);

  app.use(verifyPermission);

  app.use("/api/v2/submission", submissionRouter);

  app.use("/api/v2/revision", revisionRouter);
}

export default routes;
