import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification'

export const triggerEarthquakeAlert = async (data: { 
  magnitude: number; 
  location: string
}): Promise<void> => {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await Promise.race([
      requestPermission(),
      new Promise<'timeout'>(resolve => setTimeout(() => resolve('timeout'), 5000))
    ]);
    permissionGranted = permission === 'granted';
  }

  if (permissionGranted) {
    const message = `地震预警！震级 ${data.magnitude} @ ${data.location}`
    
    sendNotification({
      title: '紧急地震警报',
      body: message,
      sound: true
    })
  
  const store = useEmergencyStore()
  if (store && typeof store.addWarning === 'function') {
    store.addWarning(message)
  }
} 

function useEmergencyStore() {
  return {
    addWarning: (message: string) => {
      console.warn(message)
    }
  }
}}
