# STARSHOP-project

### neue

## Features

- **Register**: Der User kann sich einem Account erstellen und meldet sich damit automatisch an
- **Login**: Der User kann über eine Anmelde-Maske sich in seinen Account einloggen
- **Logout**: Der User kann sich aus seinem Account wieder ausloggen
- **Products**: Der User Kann ein oder mehre Products kaufen. Hinzufügen und Entfernen von Produkten aus dem schwebenden Einkaufswagen . Hinzufügen und Entfernen von Produkten aus dem lokalen Speicher

### Optional Features - 1

- **Account-Update**: Der User kann seine persönlichen Daten ändern (Name & Avatar)
- **Kategorie-Filter**: Es gibt eine Feste Liste von Kategorien. Der User kann diese Kategorien als Filter für die Question-Liste verwenden. Die kategorie wird bei der Erstelllung einer Question definiert

### Optional Features - 2

- **Such-Funktion**: Der User kann nach einem Search-Term über die Question-Liste filtern

### Build/Run

- [React js]
- [Javascript]

### /_ First, Install the needed packages _/

`npm install`

### Nach der installation bitte folgendes seed script ausführung :

`node scripts/loadproducts.js`

### /_ Then start the React app _/

`npm start`

## Endpunkte

### POST /user/login

logget user ein

Body:

```javascript
{
  email: "my@mail.de";
  password: "123456";
}
```

Response:

```javascript
{
  id: "ndfjher764tz874";
  email: "my@mail.de";
  name: "Hans Müller";
  adresse: "Musterstraße 1 11111 stadt";
}
```

### POST /user/register

erstellt einen neuen user und loggt ihn ein

Body:

```javascript
{
  email: "my@mail.de";
  password: "123456";
  name: "Hans Müller";
}
```

Response:

```javascript
{
  id: "ndfjher764tz874";
  email: "my@mail.de";
  name: "Hans Müller";
  adresse: "Musterstraße 1 11111 stadt";
}
```

### POST /user/logout

der usertoken cookie wird gelöscht. der token wird aus der datenbank entfernt

Body:

```javascript
{
}
```

Response:

```javascript
true;
```
# STAR-SHOP
# STAR-SHOP
# STAR-SHOP
# STAR-SHOP
