Feature: Verify Checkout Page SSS FR

  Background: User launches url
    Given the user launches the url

  @checkOut1 @mCycle1 @regressionTest @sssCheckout
  Scenario Outline: User should able to verify checkout page SSS FR
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user click on " Mon compte / Ouvrir une session "
    Then the user waits for webelement "acl-mt--x-large acl-mx--medium" with html attribute "class" to be visible
    Then the user enters text "<email>" in the textbox "Adresse courriel"
    Then the user enters text "<password>" in the textbox "Mot de passe"
    Then the user waits for webelement "submit" with html attribute "type" to be visible
    Then the user clicks on the webelement with html tag "type" as "submit"
    Then the user validates if " Salut John, Mon compte " text is visible
    Then the user checks if cart is empty
    Then the user enters text sku in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "product-localized-container" with html attribute "evtperfname" to be visible
    Then the user add product to cart
    Then the user click on "Afficher le panier"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user click on "Passer à la caisse"
    Then the user validates if webelement with html attribute "class" as "hdca-checkout-header__title" is visible
    Then the user triggers semi signed state by modifying cookies
    Then the user waits for text " Bienvenue à nouveau " to be visible
    Then the user validates if " Bienvenue à nouveau " text is visible
    Then the user validates if " Ce n’est pas vous? " text is visible
    Then the user validates if webelement with html attribute "class" as "acl-color--title acl-weight--regular" is visible
    Then the user validates if " Mot de passe oublié? " text is visible
    Then the user validates if webelement with html attribute "class" as "acl-mx--small acl-icon" is visible
    Then the user validates if the webelement with html attribute "class" as "ctHidden acl-color--title-dark" has text "**"
    Then the user validates if webelement with html attribute "class" as "ctHidden acl-input ng-untouched" is visible
    Then the user enters text "<password>" in the textbox "Mot de passe"
    Then the user click on "Confirmer"
    Then the user validates if webelement with html attribute "class" as "hdca-checkout-header__title" is visible

    Examples: 
      | email                    | password |
      | sabina_reichel@yahoo.com | Test@123 |