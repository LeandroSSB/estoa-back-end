
export const validate =
  (schema) =>
  async (req, res, next) => {
    const resource = req.body;
    try {
      await schema.validate(resource, { abortEarly: false });
      next();
    } catch (err) {
      res.status(400).json({ error: err.errors.map(a => a.toLowerCase()).join(", ") });
    }
  };

