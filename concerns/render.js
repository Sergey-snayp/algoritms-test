const custom = (res, status, data) => res.status(status).send(data);

const error = (res, error) => res.status(422).send({ success: false, error });

const success = (res, data) => res.status(200).send(data);

const notFound = (res, data) => res.status(404).send(data);

const badGateway = (res) => res.status(503).send({
  success: false,
  message: 'Bad request',
});

module.exports = {
  custom,
  error,
  success,
  notFound,
  badGateway,
};
