Feature: Registered User To Buy BOPIS From Buy Now Modal

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @registeredUser @buyNow @bopis 
  Scenario Outline: Guest user login as registered user should able to buy bopis from buy now modal
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on "enable Buy Now."
    Then the user waits for text "Sign In" to be visible
    Then the user enters text "<email>" in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user clicks on the "Sign In" button at index "2"
    Then the user waits for text "Buy Now Settings" to be visible
    Then the user presses keyboard key "Enter"
    Then the user click on "Continue Shopping"
    Then the user waits for text "Add To Cart" to be visible
    Then the user validates if "enable Buy Now." text is not visible
    Then the user click on "Buy Now"
    Then the user validates if " SHIP TO STORE" text is visible
    Then the user validates if " SCARBOROUGH #7001 " text is visible
    Then the user validates if " 428 Ellesmere Road, Scarborough, ON, M1R 4E6, (416) 609-1800 " text is visible
    Then the user validates if "Payment Method" text is visible
    Then the user validates if "Order Subtotal" text is visible
    Then the user validates if " Pick up In-Store " text is visible
    Then the user validates if "Estimated Taxes" text is visible
    Then the user validates if "Order Total" text is visible
    Then the user click on "Place Order"
    Then the user waits for text "Your order was successful." to be visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " SHIP TO STORE: " text is visible
    Then the user validates if " Buy Now - " text is visible
    Then the user validates if "Enabled" text is visible

    Examples:
      | email               | password |
      | Johndoe@example.com | Test@123 |