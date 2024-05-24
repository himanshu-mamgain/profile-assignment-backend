export const pingServer = (req: any, res: any) => {
  res.status(200).send({
    message: "Server ping successfull",
  });
};
