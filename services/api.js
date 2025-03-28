// services/api.js

// 模拟数据
const mockData = require('./mockData');

// 模拟请求方法
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const path = url.split('/').filter(p => p);
      let result = mockData;
      
      try {
        path.forEach(p => {
          if (result && typeof result === 'object') {
            result = result[p];
          } else {
            throw new Error('请求路径无效');
          }
        });
        
        if (result === undefined) {
          throw new Error('请求资源不存在');
        }
        
        resolve(result);
      } catch (error) {
        console.error('请求错误:', error, '路径:', path);
        reject(new Error('请求失败: ' + error.message));
      }
    }, 500); // 模拟网络延迟
  });
};

// API方法
const api = {
  // 用户相关
  user: {
    // 登录
    login: (username, password) => {
      // 验证用户名和密码
      if (username === 'testuser' && password === '123456') {
        return request('/user/login', 'POST', { username, password });
      } else {
        return Promise.reject(new Error('用户名或密码错误'));
      }
    },
    // 注册
    register: (userData) => {
      // 验证用户名是否为空
      if (!userData.username || !userData.password) {
        return Promise.reject(new Error('用户名和密码不能为空'));
      }
      
      // 模拟检查用户名是否已存在
      if (userData.username === 'testuser') {
        return Promise.reject(new Error('用户名已存在'));
      }
      
      return request('/user/register', 'POST', userData);
    },
    // 获取用户信息
    getInfo: () => {
      return request('/user/info', 'GET');
    },
    // 更新用户信息
    updateInfo: (userData) => {
      return request('/user/info', 'PUT', userData);
    },
    // 修改密码
    changePassword: (oldPassword, newPassword) => {
      return request('/user/password', 'PUT', { oldPassword, newPassword });
    }
  },
  
  // 老人信息相关
  elder: {
    // 获取老人信息列表
    getList: () => {
      return request('/elder/list', 'GET');
    },
    // 获取老人详细信息
    getDetail: (elderId) => {
      return request(`/elder/${elderId}`, 'GET');
    },
    // 添加老人信息
    add: (elderData) => {
      return request('/elder', 'POST', elderData);
    },
    // 更新老人信息
    update: (elderId, elderData) => {
      return request(`/elder/${elderId}`, 'PUT', elderData);
    },
    // 删除老人信息
    delete: (elderId) => {
      return request(`/elder/${elderId}`, 'DELETE');
    }
  },
  
  // 健康数据相关
  health: {
    // 获取健康数据列表
    getList: (elderId, params) => {
      return request('/health/list', 'GET', params);
    },
    // 获取健康数据详情
    getDetail: (healthId) => {
      return request(`/health/${healthId}`, 'GET');
    },
    // 添加健康数据
    add: (healthData) => {
      return request('/health', 'POST', healthData);
    },
    // 更新健康数据
    update: (healthId, healthData) => {
      return request(`/health/${healthId}`, 'PUT', healthData);
    },
    // 删除健康数据
    delete: (healthId) => {
      return request(`/health/${healthId}`, 'DELETE');
    }
  },
  
  // 健康报告相关
  report: {
    // 获取健康报告列表
    getList: (elderId, params) => {
      return request(`/report/${elderId}/list`, 'GET', params);
    },
    // 获取健康报告详情
    getDetail: (reportId) => {
      return request(`/report/${reportId}`, 'GET');
    },
    // 生成健康报告
    generate: (elderId, params) => {
      return request(`/report/${elderId}/generate`, 'POST', params);
    }
  },
  
  // 用药提醒相关
  medication: {
    // 获取用药提醒列表
    getList: (elderId) => {
      return request('/medication/list', 'GET');
    },
    // 添加用药提醒
    add: (medicationData) => {
      return request('/medication', 'POST', medicationData);
    },
    // 更新用药提醒
    update: (medicationId, medicationData) => {
      return request(`/medication/${medicationId}`, 'PUT', medicationData);
    },
    // 删除用药提醒
    delete: (medicationId) => {
      return request(`/medication/${medicationId}`, 'DELETE');
    }
  },
  
  // 就诊记录相关
  medicalRecord: {
    // 获取就诊记录列表
    getList: (elderId) => {
      return request(`/medicalRecord/${elderId}/list`, 'GET');
    },
    // 获取就诊记录详情
    getDetail: (recordId) => {
      return request(`/medicalRecord/${recordId}`, 'GET');
    },
    // 添加就诊记录
    add: (recordData) => {
      return request('/medicalRecord', 'POST', recordData);
    },
    // 更新就诊记录
    update: (recordId, recordData) => {
      return request(`/medicalRecord/${recordId}`, 'PUT', recordData);
    },
    // 删除就诊记录
    delete: (recordId) => {
      return request(`/medicalRecord/${recordId}`, 'DELETE');
    }
  }
};

module.exports = api;
