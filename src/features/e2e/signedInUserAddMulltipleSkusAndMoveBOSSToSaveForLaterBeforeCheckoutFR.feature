Feature: Signed In User Can Add Multiple Skus BOSS, BOPIS, BODFS And STH To Cart, Move BOSS To Save For Later Before Checkout From Cart In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @boss @bopis @bodfs @sth @registeredUser @amex @mCycle
  Scenario Outline: Registered user can add multiple skus boss, bopis, bodfs and sth to cart, move boss to save for later before checkout from cart
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user click on " Mon compte / Ouvrir une session "
    Then the user waits for text "Adresse courriel" to be visible
    Then the user enters text "<email>" in the textbox "Adresse courriel"
    Then the user enters text "<password>" in the textbox "Mot de passe"
    Then the user click on "Ouvrir une session"
    Then the user validates if " Salut John, Mon compte " text is visible
    Then the user checks if shipping addresses exists
    Then the user checks if cart is empty
    Then the user enters text "<Boss>" in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user click on " Expédition au magasin "
    Then the user add product to cart
    Then the user click on "Continuer à magasiner"
    Then the user clicks on the "hd-logo-fr" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<Bopis>" in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user click on " Ramassage en magasin "
    Then the user add product to cart
    Then the user click on "Continuer à magasiner"
    Then the user clicks on the "hd-logo-fr" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<Bodfs>" in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user click on " Livraison "
    Then the user add product to cart
    Then the user click on "Continuer à magasiner"
    Then the user clicks on the "hd-logo-fr" icon at index "1"
    Then the user presses keyboard key "Escape"
    Then the user enters text "<Sth>" in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user click on " Livraison "
    Then the user add product to cart
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user validates if " Arrivée en magasin : " text is visible
    Then the user click on " Modèle : FR.120-3GRS "
    Then the user presses key "Tab" "3" times
    Then the user presses keyboard key "Enter"
    Then the user waits until the spinner is no longer visible
    Then the user validates if "3 article(s) " text is visible
    Then the user validates if " 1 article(s) " text is visible
    Then the user validates if "Ajouter au panier" text is visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Sommaire du panier: " to be visible
    Then the user validates if "Livraison:" text is visible
    Then the user validates if "Ramassage en magasin:" text is visible
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters text "<phoneNum>" in the textbox "Téléphone"
    Then the user enters text "<city>" in the textbox "Ville"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Code postal"
    Then the user enters text "<address>" in textbox with placeholder "Commencez à saisir votre adresse ..."
    Then the user click on "Continuer"
    Then the user validates if " Magasin pour le ramassage " text is visible
    Then the user validates if " Expédition au magasin " text is not visible
    Then the signed in user selects pickup date
    Then the user click on "Continuer"
    Then the user waits for text "Utiliser une carte-cadeau" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters french "Amex" card details
    Then the user switches to the parent frame
    Then the user enters french billing details for "Amex" card
    Then the user click on "Continuer"
    Then the user waits for text "Passer la commande" to be visible
    Then the user clicks on text "Passer la commande" at index "1"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if " Votre commande a bien été reçue. " text is visible
    Then the user validates if the text "Numéro de commande" is visible at index "1"
    Then the user validates if " EXPÉDITION STANDARD: " text is visible
    Then the user validates if " RAMASSAGE EN MAGASIN: " text is visible
    Then the user validates if " EXPÉDITION AU MAGASIN: " text is not visible

    Examples:
      | email                | password | Boss       | Bopis      | Bodfs      | Sth        | firstName | lastName | postalCode | address            | city        | province | phoneNum   |
      | leo.ernser@yahoo.com | Test@123 | 1000720454 | 1000657245 | 1000100110 | 1000791787 | James     | Evans    | M1R 4E6    | 428 Ellesmere Road | Scarborough | Ontario  | 4123456792 |