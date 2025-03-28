// services/mockData.js
module.exports = {
  user: {
    login: {
      token: 'mock_token',
      userInfo: {
        id: 1,
        username: 'testuser',
        name: '测试用户',
        role: 'user'
      }
    },
    register: (userData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            message: '注册成功'
          });
        }, 1000);
      });
    },
    info: {
      id: 1,
      username: 'testuser',
      name: '测试用户',
      role: 'user'
    }
  },
  elder: {
    list: [
      {
        id: 1,
        name: '张爷爷',
        age: 78,
        gender: '男'
      },
      {
        id: 2,
        name: '李奶奶',
        age: 82,
        gender: '女'
      }
    ],
    detail: {
      id: 1,
      name: '张爷爷',
      age: 78,
      gender: '男',
      phone: '13800138000',
      address: '北京市朝阳区',
      medicalHistory: '高血压',
      allergies: '无'
    }
  },
  health: {
    list: [
      {
        id: 1,
        type: '血压',
        value: '120/80',
        time: '2025-03-26 10:00'
      },
      {
        id: 2,
        type: '血糖',
        value: '5.6',
        time: '2025-03-26 08:00'
      }
    ]
  },
  medication: {
    list: [
      {
        id: 1,
        medicineName: '降压药',
        dosage: '1片',
        time: '08:00',
        status: 'completed'
      },
      {
        id: 2,
        medicineName: '降糖药',
        dosage: '1片',
        time: '12:00',
        status: 'pending'
      }
    ]
  },
  medicalRecord: {
    list: [
      {
        id: 1,
        date: '2025-03-28',
        hospital: '北京协和医院',
        department: '心血管科',
        status: '已预约'
      }
    ]
  }
};
