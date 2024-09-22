import { INTERNAL_SERVER } from "../../const.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import * as bcrypt from "bcrypt";

const model = initModels(sequelize);

const register = async (req, res) => {
   try {
      /**
       * Bước 1: nhận dữ liệu từ FE qua body
       */
      const { fullName, email, pass } = req.body;
      // console.log({ fullName, email, pass });

      /**
       * Bước 2: kiểm tra email đã tồn tại hay chưa
       *    - nếu đã tồn tại: trả lỗi: Tài khoản đã tồn tại
       *    - nếu chưa tồn tại: đi tếp
       */
      const userExits = await model.users.findOne({
         where: {
            email: email,
         },
      });
      // console.log(userExits);
      if (userExits) {
         return res.status(400).json({
            message: ` Tài khoản ${email} đã tồn tại`,
            data: null,
         });
      }

      /**
       * Bước 3: mã hoá password người dùng gửi lên
       */
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const passHash = bcrypt.hashSync(pass, salt);

      /**
       * Bước 4: Tạo người dùng mới
       */
      const userNew = await model.users.create({
         full_name: fullName,
         email: email,
         pass_word: passHash,
      });

      const { pass_word, ...user } = userNew.dataValues;

      return res.status(200).json({
         message: `Đắng ký thành công`,
         data: user,
      });
   } catch (error) {
      // console.log(error);
      res.status(INTERNAL_SERVER).json({ message: `error` });
   }
};

const login = async (req, res) => {
   try {
      /**
       * Bước 1: nhận dữ liệu từ FE
       */
      const { email, pass } = req.body;
      console.log({ email, pass });

      /**
       * Bước 2: kiểm tra email đã tồn tại hay chưa
       *    - nếu tồn tại: đi tiếp
       *    - nếu chưa tồn tại thì trả lỗi: Tài khoản chưa đăng ký
       */
      const userExist = await model.users.findOne({
         where: {
            email: email,
         },
      });
      if (userExist === null) {
         return res.status(400).json({
            message: `Tài khoản ${email} chưa đăng ký`,
            data: null,
         });
      }

      /**
       * Bước 4: kiểm tra password
       *    - nếu đúng: trả kết quả "Đăng nhập thành công"
       *    - nếu sai: trả lỗi "Đăng nhập thất bại"
       */
      const passDb = userExist.pass_word;
      const passFe = pass;
      console.log({ passDb, passFe });
      if (bcrypt.compareSync(passFe, passDb)) {
         return res.status(200).json({
            message: `Đăng nhập thành công`,
            data: null,
         });
      } else {
         return res.status(400).json({
            message: `Mật khẩu không chính xac`,
            data: null,
         });
      }
   } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER).json({ message: `error` });
   }
};

const loginFacebook = async (req, res) => {
   try {
      /**
       * Bước 1: nhận dữ liệu từ FE
       */
      const { name, email, id, picture } = req.body;

      /**
       * Bước 2: kiểm tra id có tồn tại trong db qua face_app_id
       *    - nếu tồn tại: trả về thông báo đang nhập thành công
       *    - nếu chưa tồn tại: tạo mới người dùng
       */
      const userExist = await model.users.findOne({
         where: {
            face_app_id: id,
         },
      });
      if (userExist) {
         return res.status(200).json({
            message: `Đăng nhập thành công`,
            data: userExist,
         });
      } else {
         const userNew = await model.users.create({
            face_app_id: id,
            full_name: name,
            email: email,
            avatar: picture.data.url,
         });

         return res.status(200).json({
            message: "Đăng nhập thành công",
            data: userNew,
         });
      }
   } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER).json({ message: `error` });
   }
};

export { register, login, loginFacebook };
