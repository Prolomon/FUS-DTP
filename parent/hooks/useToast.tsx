import React, { createContext, useCallback, useContext, useState } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Types
export type ToastType = 'alert' | 'confirm';
export type ToastStatus = 'success' | 'failed' | 'warn';

interface ToastOptions {
  message: string;
  type?: ToastType;
  status?: ToastStatus;
  onYes?: () => void;
  onNo?: () => void;
  onOk?: () => void;
}

interface ToastContextProps {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps>({ showToast: () => { } });

export const useToast = () => useContext(ToastContext);

const STATUS_COLORS = {
  success: '#22c55e',
  failed: '#ef4444',
  warn: '#f59e42',
};

const TOAST_HEIGHT = 90;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState<ToastOptions & { status: ToastStatus }>({
    message: '',
    type: 'alert',
    status: 'success',
  });
  const translateY = useState(new Animated.Value(-TOAST_HEIGHT))[0];

  const showToast = useCallback((options: ToastOptions) => {
    setToast({
      ...options,
      type: options.type || 'alert',
      status: options.status || 'success',
    });
    setVisible(true);
    Animated.timing(translateY, {
      toValue: Platform.OS === 'ios' ? 60 : 30,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const hideToast = useCallback(() => {
    Animated.timing(translateY, {
      toValue: -TOAST_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  }, [translateY]);

  const handleYes = () => {
    hideToast();
    toast.onYes && toast.onYes();
  };
  const handleNo = () => {
    hideToast();
    toast.onNo && toast.onNo();
  };
  const handleOk = () => {
    hideToast();
    toast.onOk && toast.onOk();
  };
  
  setTimeout(() => {
    if (visible && toast.type === 'alert') {
      hideToast();
    }
  }, 3000);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <Animated.View
          style={[
            styles.toast,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={[styles.toastCard, {
            borderWidth: 2,
            borderColor: STATUS_COLORS[toast.status],
            shadowColor: STATUS_COLORS[toast.status],
            shadowOpacity: 0.18,
            shadowRadius: 12,
            backgroundColor: `${STATUS_COLORS[toast.status]}66`, // 0.4 opacity in hex
          },]}>
            <Text style={[styles.toastText, { color: STATUS_COLORS[toast.status] }]}>{toast.message}</Text>
            <View style={styles.buttonRow}>
              {toast.type === 'confirm' && (
                <>
                  <TouchableOpacity style={[styles.button, styles.buttonYes]} onPress={handleYes}>
                    <Text style={styles.buttonLabel}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.buttonNo]} onPress={handleNo}>
                    <Text style={styles.buttonLabel}>No</Text>
                  </TouchableOpacity>
                </>
              )}
              {toast.type === 'alert' && (
                <TouchableOpacity style={[styles.button, styles.buttonOk, {
                  borderWidth: 2,
                  borderColor: STATUS_COLORS[toast.status],
                },]} onPress={handleOk}>
                  <Text style={[styles.buttonLabel, { color: STATUS_COLORS[toast.status] }]}>Ok</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    minHeight: TOAST_HEIGHT,
    paddingHorizontal: 18,
    paddingVertical: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    zIndex: 9999,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastCard: {
    width: "100%",
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  toastText: {
    color: '#003399',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 4,
  },
  button: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: '#009966',
    shadowColor: '#003399',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  buttonLabel: {
    color: '#009966',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  buttonYes: {
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  buttonNo: {
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  buttonOk: {
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
});

export default useToast;
