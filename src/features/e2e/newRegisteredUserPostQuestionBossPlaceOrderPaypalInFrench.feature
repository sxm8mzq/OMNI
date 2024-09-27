Feature: New Registered User Post Question On PIP Page And Place Order On BOSS Item Using Paypal In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @questionAnswer @paypal @newRegisteredUser @boss
  Scenario Outline: New registered user post question on pip page and place order on boss item using paypal in french
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user click on " Mon compte / Ouvrir une session "
    Then the user click on " Créer un compte "
    Then the user click on "Créer un compte personnel"
    Then the user enters text "<firstName>" in the textbox " Prénom "
    Then the user enters text "<lastName>" in the textbox " Nom de famille "
    Then the user enters random email in the textbox " Adresse courriel "
    Then the user enters text "<password>" in the textbox " Mot de passe "
    Then the user enters text "<postalCode>" in the textbox " Code postal "
    Then the user clicks on the "Créer un compte" button at index "2"
    Then the user validates if " Votre compte a été créé! " text is visible
    Then the user presses keyboard key "Escape"
    Then the user validates if " Salut <firstName>, Mon compte " text is visible
    Then the user enters text sku in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user clicks on text "Q et R (" at index "1"
    Then the user click on "Poser une question"
    Then the user enters text "<question>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<nickName>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<email>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<location>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user presses keyboard key "Enter"
    Then the user presses key "Tab" "3" times
    Then the user presses keyboard key "Enter"
    Then the user presses keyboard key "Enter"
    Then the user scrolls to "Ajouter au panier"
    Then the user add product to cart
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOSS_"
    Then the user waits for text " Arrivée en magasin : " to be visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Commande sécurisée " to be visible
    Then the user enters text "<phoneNum>" in the textbox "Téléphone"
    Then the user click on "Continuer"
    Then the user waits for text "carte de crédit" to be visible
    Then the user clicks on the "paypal" icon at index "1"
    Then the user click on "Continuer avec"
    Then the user waits for text "Pay with PayPal" to be visible
    Then the user enters text "<paypalUserName>" in textbox with placeholder "Email or mobile number"
    Then the user click on "Next"
    Then the user enters text "<paypalPassword>" in textbox with placeholder "Password"
    Then the user click on "Log In"
    Then the user click on "Complete Purchase"
    Then the user waits for text "Adresse de facturation :" to be visible
    Then the user click on "Continuer"
    Then the user waits for text "Passer la commande" to be visible
    Then the user clicks on text "Passer la commande" at index "1"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if " Votre commande a bien été reçue. " text is visible
    Then the user validates if the text "Numéro de commande" is visible at index "1"
    Then the user validates if " EXPÉDITION AU MAGASIN: " text is visible

    Examples:
      | question                               | nickName | location         | email         | firstName | lastName | password | postalCode | phoneNum   | paypalUserName  | paypalPassword |
      | Cela peut-il être utilisé en cuisine ? | TestUser | Toronto, Ontario | Test@test.com | Luther    | Bergeron | Test@123 | M1R 4E6    | 4123456789 | cabuyer2@thd.ca | 11111111       |