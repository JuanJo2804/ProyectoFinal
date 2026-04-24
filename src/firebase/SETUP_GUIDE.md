# Configuración de Firebase

## Pasos para configurar Firebase en tu proyecto

### 1. Crear un proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en **Crear un proyecto** o **Agregar proyecto**
3. Nombra tu proyecto (ej: "Reto Fullstack")
4. Completa los pasos de configuración
5. Una vez creado, ve a la configuración del proyecto

### 2. Obtener tus credenciales

1. En Firebase Console, ve a **Configuración del proyecto** (rueda de engranaje)
2. Ve a la pestaña **Aplicaciones**
3. Bajo "Tus aplicaciones", haz clic en el ícono de JavaScript **</>**
4. Copia el objeto `firebaseConfig` que aparece

### 3. Actualizar el archivo de configuración

Reemplaza los valores en `/src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Con los valores reales de tu proyecto Firebase.

### 4. Habilitar autenticación por Email/Password

1. En Firebase Console, ve a **Autenticación**
2. En la pestaña **Proveedores de Inicio de sesión**, haz clic en **Correo electrónico/Contraseña**
3. Habilita tanto "Email/password" como "Cuenta vinculada"
4. Guarda los cambios

### 5. Crear colección Firestore

1. En Firebase Console, ve a **Firestore Database**
2. Haz clic en **Crear base de datos**
3. Selecciona el modo **Iniciar en modo de prueba**
4. Selecciona la ubicación (ej: us-central1)
5. Crea la colección

### 6. Configurar reglas de Firestore

Para desarrollo, puedes usar estas reglas (NO para producción):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Actualiza en la pestaña **Reglas** de Firestore.

### 7. Usar la autenticación en tu aplicación

Ya está configurado! La aplicación automaticamente:

- Registra nuevos usuarios con `Register`
- Inicia sesión con `Login`
- Guarda datos adicionales en Firestore
- Mantiene el estado de autenticación global

## Variables de entorno (opcional)

Si quieres proteger tu API Key, puedes usar variables de entorno:

```bash
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
# ... etc
```

Y actualizar `config.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

## Usar el contexto de autenticación en otros componentes

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Bienvenido {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Por favor inicia sesión</p>
      )}
    </div>
  );
}
```

## Troubleshooting

### Error: "Misconfigured Firebase"
- Verifica que tus credenciales en `config.js` sean correctas
- Asegúrate de que la autenticación está habilitada en Firebase

### Error: "Permission denied"
- Verifica las reglas de Firestore
- Asegúrate de estar autenticado (user != null)

### Error: "Email already in use"
- El email ya está registrado, intenta con otro
- O usa la opción "Forgot password" para recuperar la cuenta
